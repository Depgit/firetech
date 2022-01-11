const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        default: []
    },
    messages: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Group', groupSchema);