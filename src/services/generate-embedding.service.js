const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateEmbedding = async (text) => {
  const model = genAI.getGenerativeModel({ model: "embedding-001" }); 
  const result = await model.embedContent(text);
  return result.embedding.values; // Returns an array of floats
};

module.exports = {
  generateEmbedding,
};