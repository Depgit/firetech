const mongoose = require('mongoose');
const User = require('./User');
const Post = require('./Post');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Comment', commentSchema);