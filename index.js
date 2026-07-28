const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to the Blog Management System API!");
});

// GET Route
app.get("/blogs", (req, res) => {

    res.json({
        message: "GET request received successfully!",
        blogs: []
    });

});

// POST Route
app.post("/blogs", (req, res) => {

    const blog = req.body;

    res.status(201).json({
        message: "Blog received successfully!",
        data: blog
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});