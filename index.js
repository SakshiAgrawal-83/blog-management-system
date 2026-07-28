const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Store blogs in memory
let blogs = [];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to the Blog Management System API!");
});

// View all blogs
app.get("/blogs", (req, res) => {
    res.status(200).json({
        message: "Blogs retrieved successfully!",
        totalBlogs: blogs.length,
        blogs: blogs
    });
});

// Add a blog
app.post("/blogs", (req, res) => {

    const { title, author, category, content } = req.body;

    if (!title || !author || !category || !content) {
        return res.status(400).json({
            message: "All fields are required."
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});