const express = require("express");
const router = express.Router();
const Post = require("../../models/Post")

/**
 * GET /
 * Post with ID
 */
router.get("/post/:id", async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await Post.find({ blog_id: slug });
        res.statusCode = 200;
        res.statusMessage = "Data fetched"
        res.send(data);
    } catch (error) {
        res.statusCode = 404;
        res.statusMessage = "Bad Request"
        console.log(error);

        res.send(error);
    }
});

module.exports = router