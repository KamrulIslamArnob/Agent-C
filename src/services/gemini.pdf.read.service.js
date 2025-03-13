const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });

async function getAiResponse(questionText) {
    try {
        const prompt = `
            You are a helpful AI assistant that parses textual data into a Mongoose-compatible JSON format for storing exam questions.
            Your task is to extract and structure the following question text based on the given Mongoose schema.

            The question text is as follows:
            ${questionText}

            The Schema format is as follows:

            const questionSchema = new mongoose.Schema({
                questionNumber: Number,
                parts: [{
                    part: String,
                    questionText: String,
                    codeSnippet: String,
                    marks: Number,
                    questionType: String
                }]
            });
            
            const examSchema = new mongoose.Schema({
                examTitle: String,
                trimester: String,
                courseCode: String,
                courseTitle: String,
                totalMarks: Number,
                duration: String,
                questions: [questionSchema]
            });

            Please provide the structured JSON output **without markdown formatting**, without triple backticks, and ensure it is directly parsable.

            Ensure that json should be directly parsable.
            Escape all 'codeSnippet' values correctly** (e.g., \`printf(\\\"Hello\\\")\` instead of \`printf("Hello")\`).
            Ensure that the JSON is valid and does not contain any extra text or explanations.
            Do not include any additional comments or explanations in the output.
            Just provide the JSON output.
            `;

        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });

        // console.log("🔍 Full Response from Gemini API:", JSON.stringify(response, null, 2));

        // console.log(response.response.text());

        // Validate response structure
        if (!response.response.text()) {
            throw new Error("No valid response received from Gemini API.");
        }

        // Extract response text
        let answer = response.response.text();
        console.log("📥 Raw Response from Gemini:", answer);

        // Remove Markdown formatting (```json ... ```)
        answer = answer.replace(/^```json/, "").replace(/```$/, "").trim();

        // Find JSON start and end safely
        const jsonStart = answer.indexOf("{");
        const jsonEnd = answer.lastIndexOf("}");
        if (jsonStart === -1 || jsonEnd === -1) {
            throw new Error("Invalid JSON format in AI response.");
        }

        // Extract only JSON content
        answer = answer.substring(jsonStart, jsonEnd + 1);
        console.log("📜 Extracted JSON String:", answer);

        // Parse JSON safely
        const parsedJson = JSON.parse(answer);
        return parsedJson;

    } catch (error) {
        console.error("❌ Error generating AI response:", error.message);
        return null;
    }
}

module.exports = { getAiResponse };
