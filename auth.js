require("dotenv").config();

const express = require("express");
const connectDB = require("./server/config/db")


const app = express();
const PORT = 4000 || process.env.PORT;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./server/routes/users/register"));
app.use("/", require("./server/routes/users/login"));
app.use("/", require("./server/routes/users/refresh"));

app.listen(PORT, () => {
    console.log(`Auth Server starting on port ${PORT}`);
})