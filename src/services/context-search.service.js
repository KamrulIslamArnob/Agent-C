const embeddingGenerator = require("../services/generate-embedding.service");
const connectMongoDB = require("../configs/database.config"); // Ensure MongoDB is connected

// Function to perform vector search
async function findRelevantContext(query) {
    try {
        const db = await connectMongoDB(); // Ensure connection is established
        const collection = db.collection("c_agent_collection"); // Change to your actual collection name

        if (!collection) {
            throw new Error("Database collection is not initialized.");
        }

        // Generate embedding for the query
        const queryEmbedding = await embeddingGenerator.generateEmbedding(query);
        if (!queryEmbedding) {
            throw new Error("Failed to generate query embedding.");
        }

        // Perform vector search
        const result = await collection.aggregate([
            {
                $vectorSearch: {
                    index: "c_agent_vector_index",
                    queryVector: queryEmbedding,
                    path: "embedding",
                    numCandidates: 10,
                    limit: 3,
                }
            }
        ]).toArray();

        console.log("✅ Vector search completed successfully.");
        return result.map(doc => doc.text);
    } catch (error) {
        console.error("❌ Error finding relevant context:", error);
        return [];
    }
}

module.exports = { findRelevantContext };
