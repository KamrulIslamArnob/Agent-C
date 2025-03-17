const mongoose = require("mongoose");
require("dotenv").config();

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
        return mongoose.connection.db;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

module.exports = {connectMongoDB};
