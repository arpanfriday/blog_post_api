const express = require("express");
const router = express.Router();
const Post = require("../../models/Post")

/**
 * PUT /
 * Update post with specific ID
 */
router.put("/post/:id", async (req, res) => {
    try {
        let slug = req.params.id;
        const result = await Post.updateOne(
            { blog_id: slug }, // Filter condition
            {
                title: req.body.title,
                body: req.body.body,
                owner: req.body.owner,
            }  // Update fields
        );
        res.status(200).json({
            message: 'Post updated successfully',
            result,
        });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
});

module.exports = router