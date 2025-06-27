import express from "express";
import Blog from "../models/Blog.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", async (req, res) => {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
});

router.post("/", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { title, content } = req.body;

        if (!title || !content) return res.json({ error: "Missing fields" });

        const newBlog = new Blog({
            username: decoded.username, 
            title,
            content
        });

        await newBlog.save();
        res.json({ success: true });
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
});


export default router;