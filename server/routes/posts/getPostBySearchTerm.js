const express = require("express");
const router = express.Router();
const Post = require("../../models/Post")

/**
 * POST /
 * Get posts with specific words. Here we search the id in title
 */
router.post("/search", async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            ]
        });
        res.send(data);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router