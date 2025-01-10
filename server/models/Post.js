const mongoose = require("mongoose")
const userSchema = require("./User")

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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, { versionKey: '_version' });

module.exports = mongoose.model("Post", postSchema)