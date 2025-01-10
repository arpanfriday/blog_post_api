require("dotenv").config();

const express = require("express");
const cookieParser = require('cookie-parser');
const connectDB = require("./server/config/db")

const app = express();
const PORT = 3000 || process.env.PORT;

// Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./server/routes/posts/home"))
app.use("/", require("./server/routes/posts/getPostById"))
app.use("/", require("./server/routes/posts/getPostBySearchTerm"))
app.use("/", require("./server/routes/posts/createPost"))
app.use("/", require("./server/routes/posts/deletePost"))
app.use("/", require("./server/routes/posts/updatePost"))
app.use("/", require("./server/routes/posts/getAllPosts"))

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
})