const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-2.0-flash",
  apiKey: process.env.C_Agent_GOOGLE_API_KEY,
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
});

async function getAnswer(input) {
  const response = await model.invoke(input);
  return response.content;
}

module.exports = { getAnswer };
