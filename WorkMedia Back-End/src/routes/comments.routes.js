const express = require("express");
const commentsController = require('../controllers/commentsController');

const routerComments  = express.Router();


routerComments
    .get('/comments/list/all', commentsController.listAllComments) // RF COMMENTS 02
    .get('/comments/list/:id', commentsController.listPostComments) // RF COMMENTS 03
    .post('/comments/new', commentsController.createComment) // RF COMMENTS 01



module.exports = routerComments;