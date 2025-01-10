const express = require('express');
const Post = require('../../models/Post'); // Assuming you have a Post model
const { verifyAccessToken } = require('../../helpers/jwt_helper')

const router = express.Router();

// Route to get all posts with pagination
router.get('/posts', verifyAccessToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const posts = await Post.find().skip(skip).limit(limit);
        const totalPosts = await Post.countDocuments();

        res.json({
            totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page,
            posts
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;