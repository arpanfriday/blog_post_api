const express = require("express");
const router = express.Router();
const Post = require("../../models/Post")


/**
 * GET /
 * HOME
 */
router.get("", async (req, res) => {
    res.send("Welcome to the app");
});

module.exports = router
