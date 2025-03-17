const { connectMongoDB } = require("../configs/database.config"); // Import the connection function

const storeEmbedding = async (text, embedding) => {
  try {
    const db = await connectMongoDB();
    const collection = db.collection("c_agent_collection");

    if (!collection) {
        throw new Error("Database collection is not initialized.");
    }

    await collection.insertOne({ text, embedding });
    console.log("Stored successfully");
  } catch (error) {
    console.error("Error storing embedding:", error);
  }
};

// Initialize the collection on startup

module.exports = { storeEmbedding };
