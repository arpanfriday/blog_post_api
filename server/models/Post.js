const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    blog_id: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Post", postSchema)