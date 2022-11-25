const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
    content: {type: String, required: true, min: 3, max: 260},
    autorId: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'posts', required: true},
    createdDate: {type: Date, default: Date.now()}
})

const commentsModel = mongoose.model('comment', commentsSchema);

module.exports = commentsModel;