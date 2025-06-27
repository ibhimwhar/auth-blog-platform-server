import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import connection from "./db/connection.js";
import authRoute from "./routes/authRoute.js";
import blogRoute from "./routes/blogRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json());
app.use(morgan("dev"))

app.use("/api", authRoute);
app.use("/blogs", blogRoute);

// Protected Dashboard Route
app.get("/dashboard", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: `Welcome User ${decoded.id}` });
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
});

app.listen(PORT, () => {
    connection();
    console.log(`Server is running on port ${PORT}`)
})