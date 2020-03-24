const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6
    },
    description: {
        type: String,
        required: true,
        min: 25
    },
    updatedBy: {
        type: String,
        required: true,
        min: 6
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: true,
        min: 6
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);