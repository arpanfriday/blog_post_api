const express = require("express");
const router = express.Router();
const Post = require("../../models/Post")

/**
 * DELETE /
 * Delete post with specific ID
 */
router.delete("/post/:id", async (req, res) => {
    try {
        let slug = req.params.id;
        const data = await Post.deleteOne({ blog_id: slug });
        res.statusCode = 200;
        res.statusMessage = "Data deleted"
        res.send(data);
    } catch (error) {
        res.statusCode = 404;
        res.statusMessage = "Bad Request"
        console.log(error);

        res.send(error);
    }
});

module.exports = router