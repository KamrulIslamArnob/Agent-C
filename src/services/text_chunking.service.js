const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { generateEmbedding } = require("./generate-embedding.service");
const { storeEmbedding } = require("./embedding.store.service");

async function processAndStoreText(text) {
    try {
        // Clean the text
        const cleanedText = text.replace(/\s+/g, " ").trim();

        // Split text using LangChain's RecursiveCharacterTextSplitter
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 50
        });
        const chunks = await splitter.splitText(cleanedText);

        // Process each chunk: Generate embeddings and store in MongoDB
        for (const chunk of chunks) {
            const embedding = await generateEmbedding(chunk);
            if (embedding) {
                await storeEmbedding(chunk, embedding);
            } else {
                console.warn("Failed to generate embedding for chunk:", chunk);
            }
        }

        console.log("Successfully stored text chunks in MongoDB");
    } catch (error) {
        console.error("Error processing text:", error);
    }
}

module.exports = processAndStoreText;