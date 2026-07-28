const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Store blog posts
let blogs = [];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to the Blog Management System API!");
});

// View all blogs
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// Add a new blog
app.post("/blogs", (req, res) => {

    const { title, author, category, content } = req.body;

    if (!title || !author || !category || !content) {
        return res.status(400).json({
            message: "Please fill in all fields."
        });
    }

    const newBlog = {
        id: blogs.length + 1,
        title,
        author,
        category,
        content
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: "Blog added successfully!",
        blog: newBlog
    });

});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});