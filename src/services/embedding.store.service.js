const { connectDB } = require("../configs/database.config"); // Import the connection function
// const { ObjectId } = require("mongodb");

let collection;

const initCollection = async () => {
  const db = await connectDB();
  collection = db.collection("question-vectors");
};

const storeEmbedding = async (text, embedding) => {
  if (!collection) {
    console.error("Database is not connected. Ensure connectDB() is called first.");
    return;
  }

  try {
    await collection.insertOne({ text, embedding });
    console.log("Stored successfully");
  } catch (error) {
    console.error("Error storing embedding:", error);
  }
};

// Initialize the collection on startup
initCollection();

module.exports = { storeEmbedding };
