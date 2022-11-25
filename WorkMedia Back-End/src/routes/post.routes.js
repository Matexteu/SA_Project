const express = require('express');
const postController = require('../controllers/postController.js');
const multerConfig = require('../config/multer');

const routerPosts = express.Router();


routerPosts
    .get('/posts/list/all', postController.listPost) // RF 09 POST LIST ALL
    .get('/posts/list/:id', postController.listPostById) // RF 11 | RF(14)/ RF(16) POST LIST FOR USER
    .get('/posts/list/user/:id', postController.listPostsByUserID)
    .post('/posts/new', multerConfig.single('file') , postController.sendPost) // RF 08 POST CREATE
    .post('/posts/delete/:id', postController.deletePost) // RF 12 POST DELETE
    .put('/posts/edit/:id',  multerConfig.single('file') , postController.editPost) // RF 10 POST EDIT


module.exports = routerPosts;