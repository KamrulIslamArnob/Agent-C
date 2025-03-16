const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { generateEmbedding } = require("./generate-embedding.service");
const { storeEmbedding } = require("./embedding.store.service");

async function processAndStoreText(docs) {
    try {
        // Initialize the text splitter
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 50,
        });

        // Process each document
        for (const doc of docs) {
            // Split the text into chunks
            const chunks = await splitter.splitText(doc.pageContent);

            // Generate embeddings for each chunk and store in MongoDB
            for (const chunk of chunks) {
                const embedding = await generateEmbedding(chunk);
                if (embedding) {
                    await storeEmbedding(chunk, embedding);
                } else {
                    console.warn("Failed to generate embedding for chunk:", chunk);
                }
            }
        }

        console.log("Successfully stored text chunks in MongoDB");
    } catch (error) {
        console.error("Error processing text:", error);
    }
}

module.exports = processAndStoreText;