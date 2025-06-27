import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    username: String,
    title: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Blog", BlogSchema);
