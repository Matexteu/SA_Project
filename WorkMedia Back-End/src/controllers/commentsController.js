const commentsModel = require('../models/Comments');
const userModel = require("../models/User");

class commentsController{
    // RF - Comments 01

    static async listAllComments(req, res){
        try {
            const allComments = await commentsModel.find().populate({path: 'users posts'}).exec();
            res.status(200).send(allComments);
        } catch (error) {
            res.status(400).send('Não foi possível carregar os comentários, tente novamente mais tarde');
        }
    }
    // RF - Comments 02

    static async listPostComments(req, res){
        const {id} = req.params;
        try {
            const postComments = await commentsModel.find({postId: id}).populate({path: 'users posts'}).exec();
            res.status(200).send(postComments);

        } catch (error) {
            res.status(400).send('Não foi possível carregar os comentários, tente novamente mais tarde');
        }   
    }
    // RF - Comments 03

    static async createComment(req, res){
        const token = req.body.token;
        if(!token) return res.status(403).send('Não foi possível fazer esse comentário');
        try {
            const selectedUser = await userModel.findOne({email: req.body.email});
            if(!selectedUser) return res.status(400).send('Não foi possível fazer esse comentário');
            const newComment = new commentsModel({
                content: req.body.cotent,
                autorId: selectedUser._id,
                postId: req.body.id
            })
            newComment.save();
            res.status(201).send('Comentário feito com sucesso!');
        } catch (error) {
            res.status(500).send('Não foi possível fazer esse comentário!')
        }

    }
    // RF - Comments 04
    static async deleteComment(req, res){
        const {id} = req.params;
        const token = req.body.token;
        if(!token) return res.status(403).send('Não foi possível fazer esse comentário');
        try {
            const authorization = jwt.verify(token, process.env.SECRET_TOKEN);
            if(!authorization) return res.status(403).send('Access Denied');

            await commentsModel.findOneAndRemove({_id: id})
            res.status(200).send('Post deletado com sucesso!')
        } catch (error) {
            res.status(403).send('Error For Access' + error);
        }
    }
}


module.exports = commentsController;