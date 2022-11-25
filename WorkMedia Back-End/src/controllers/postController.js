const UploadImage = require("../uploadImages/upload");
const postModel = require("../models/Posts");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require('fs');
// Controle das publicações --- RF(08 a 12);

class postController{

    // RF(08) - CREATE POSTS
    static async sendPost(req, res){
        
        let response;
        try {
            const selectedUser = await userModel.findOne({email: req.body.email});
            if(!selectedUser) return res.status(400).send('Não foi possível executar esta ação!')
            const authorization = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
            if(!authorization) return res.status(403).send(`Não foi possível enviar o post ${error}`)
            if(req.file?.filename){
                response = await UploadImage(req.file?.filename);
            }
            const newPost = new postModel({
                content: req.body.content,
                autor: selectedUser._id,
                image_url: (req.file) ? response.url : ''
            })
            await newPost.save();
            if(response?.status){
                fs.unlink(`./src/temp/uploads/${req.file?.filename}`, function (err){
                    if (err) throw err;
                    console.log('Arquivo deletado!');
                })
            }
            res.status(201).send("Post Enviado!");
        } catch (error) {
            res.status(500).send(`Não foi possível enviar o post ${error}`)
        }
    }
    //RF (09) WORKING LIST ALL POSTS
    static async listPost(req, res){
        try {
            const posts = await postModel.find().populate({path:'autor', select: 'name email avatar createdDate age'}).exec()
            res.status(200).send(posts);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    //RF (10) WORKING EDIT POSTS
    static async editPost(req, res){
        const filename = req.file?.filename;
        const {id} = req.params;
        try {
            const authorization = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
            if(!authorization) return res.status(403).send('Access Denied');
            const findPost = await postModel.findOne({_id: id}).populate({path:'autor', select: '_id name email createdDate age'}).exec();
            if(!findPost) return res.status(400).send('Não foi possível concluir essa ação!');
            const findUser = await userModel.findOne({email: req.body.email});
            if(!findUser) return res.status(403).send('Não foi possível concluir essa ação!');
            if(findPost.autor._id == findUser._id) return res.status(403).send('Você não tem permissão para fazer esssa ação!');
            const response = await UploadImage(filename);
            if(filename){
                if(response.status){
                    fs.unlink(`./src/temp/uploads/${filename}`, function (err){
                        if (err) throw err;
                        console.log('Arquivo deletado!');
                    });
                }
            }
            await postModel.findOneAndUpdate({_id: id},{$set:{
                content: (req.body.content) ? req.body.content : findPost.content,
                image_url: (!filename) ?  findPost.image_url : response.url
            }});
            console.log((!filename) ?  findPost.image_url : response.url)
            res.status(200).send('Post atualizado com sucesso!');
        } catch (error) {
            console.log(error)
            res.status(500).send('Ocorreu um erro, tente novamente mais tarde')
        }
    }
    //RF (11) WORKING AND RF(14)/ RF(16) LIST FOR PERFIL...
    static async listPostById(req, res){
        const id = req.params.id;
        try {
            const userPost = await postModel.find({_id: id}).populate({path:'autor', select: 'name email avatar createdDate age'}).exec();
            res.status(200).send(userPost);
        } 
        catch (error) {
            res.status(400).send(error);
        }
    }
    static async listPostsByUserID(req, res){
        const {id} = req.params;
        let userPosts = [];
        try {
            const posts = await postModel.find().populate({path:'autor', select: 'name email createdDate avatar age'}).exec();
            for(let i in posts){
                if(posts[i].autor._id == id){
                    userPosts.push(posts[i]);
                }
            }
            res.status(200).send(userPosts);
        } catch (error) {
            
        }
    }
    // RF (12) DELETE POSTS
    static async deletePost(req, res){
        const {id} = req.params;
        try {
            const authorization = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
            if(!authorization) return res.status(403).send('Access Denied');
            const findPost = await postModel.findOne({_id: id}).populate({path:'autor', select: '_id name email createdDate age'}).exec();
            if(!findPost) return res.status(400).send('Não foi possível concluir essa ação!');
            const findUser = await userModel.findOne({email: req.body.email});
            if(!findUser) return res.status(403).send('Não foi possível concluir essa ação!');
            await postModel.findOneAndRemove({_id: id})
            res.status(200).send('Post deletado com sucesso!')
        } catch (error) {
            res.status(403).send('Error For Access' + error);
        }

    }
}

module.exports = postController;