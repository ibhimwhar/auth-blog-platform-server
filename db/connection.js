import mongoose from "mongoose";

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONDO_DB_URL)
        console.log("MongoDb successfully connected")
    } catch (err) {
        console.log("MongoDb failed:", err)
    }
}

export default connection;