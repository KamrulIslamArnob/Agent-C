const { connectDB } = require('../configs/database.config');
const embeddingGenerator = require('../services/generate-embedding.service');

let collection;
let collectionReady = null; // A promise that ensures the collection is ready

const initCollection = async () => {
    if (!collectionReady) {
        collectionReady = (async () => {
            try {
                const db = await connectDB();
                if (!db) throw new Error("Failed to get database instance.");

                collection = db.collection("question-vectors"); // Now works correctly
                console.log("✅ Collection initialized successfully.");
            } catch (error) {
                console.error("❌ Error initializing collection:", error);
                collectionReady = null; 
                throw error;
            }
        })();
    }
    return collectionReady; 
};

// Function to perform vector search
async function findRelevantContext(query) {
    try {
        await initCollection(); // Ensure collection is initialized

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

        return result.map(doc => doc.text);
    } catch (error) {
        console.error("❌ Error finding relevant context:", error);
        return [];
    }
}

// Initialize collection when the module is loaded
initCollection().catch(console.error);

module.exports = { findRelevantContext };