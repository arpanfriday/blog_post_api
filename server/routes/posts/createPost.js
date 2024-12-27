const express = require("express");
const router = express.Router();
const Post = require("../../models/Post")

/**
 * POST /
 * Get posts with specific words. Here we search the id in title
 */
router.post("/create", async (req, res) => {
    try {
        const count = await Post.countDocuments();

        const dataToInsert = {
            blog_id: count + 1,
            title: req.body.title,
            body: req.body.body
        }

        response = await Post.create(dataToInsert);

        res.statusMessage = "Created";
        res.send({
            message: "Created doccument",
            data_inserted: [response]
        });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router


// function insertPostData() {
//     // Create an array to store the blog post objects
//     const blogPosts = [];

//     // Loop to generate blog post objects with numbers from 1 to 10
//     for (let i = 2000001; i <= 3000000; i++) {
//         const blogPost = {
//             blog_id: i,
//             title: `Blog Post Title ${i}`,
//             body: `This is the body content for Blog Post Title ${i}. It provides information about a fascinating topic.`
//         };

//         blogPosts.push(blogPost);
//     }

//     // Convert the array to JSON format
//     // const blogPostsJson = JSON.stringify(blogPosts, null, 2);

//     // Insert the JSON array
//     Post.insertMany(blogPosts)
// }

// insertPostData();
