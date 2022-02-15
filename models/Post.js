const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    meme: {
        type: String,
        required: true
    },
    title: { 
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Post', postSchema);
