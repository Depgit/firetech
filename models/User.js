const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default:""
    },
    follower: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports =  mongoose.model('User', UserSchema)