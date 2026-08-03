const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const Blog = require("./models/Blog");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ Connected to MongoDB Atlas");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err);
});
// Store blogs in memory

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to the Blog Management System API!");
});

// View all blogs
app.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find();

        res.json({
            message: "Blogs retrieved successfully!",
            totalBlogs: blogs.length,
            blogs: blogs
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Add a blog
app.post("/blogs", async (req, res) => {

    const { title, author, category, content } = req.body;

    if (!title || !author || !category || !content) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    try {

        const newBlog = await Blog.create({
            title,
            author,
            category,
            content
        });

        res.status(201).json({
            message: "Blog added successfully!",
            blog: newBlog
        });

    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }

});

// Update Blog (PUT)
app.put("/blogs/:id", async (req, res) => {

    try {

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                content: req.body.content
            },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json({
            message: "Blog updated successfully!",
            blog: updatedBlog
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

});

// Get Single Blog
app.get("/blogs/:id", async (req, res) => {

    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json(blog);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

});

// Delete Blog
app.delete("/blogs/:id", async (req, res) => {

    try {

        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        if (!deletedBlog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json({
            message: "Blog deleted successfully!",
            blog: deletedBlog
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});