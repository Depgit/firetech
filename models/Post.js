const mongoose = require('mongoose');
const User = require('./User');
const Comment = require('./Comment');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    meme: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Post', postSchema);
