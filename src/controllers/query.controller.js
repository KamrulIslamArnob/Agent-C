const { GoogleGenerativeAI } = require("@google/generative-ai");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai"); // ✅ Correct Import
const { BufferMemory } = require("langchain/memory");
const contextSearchService = require("../services/context-search.service");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const chatModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
});




// ✅ Create in-memory storage for chat history
const memory = new BufferMemory({
    memoryKey: "chat_history",
    returnMessages: true
});

exports.askQuestion = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).send({
                message: "Question cannot be empty"
            });
        }

        // Fetch context from vector database
        const result = await contextSearchService.findRelevantContext(question);

        if (!result) {
            return res.status(400).send({
                message: "No relevant data found"
            });
        }

        // ✅ Retrieve past conversation history
        const chatHistory = await memory.loadMemoryVariables({});
        const previousMessages = chatHistory.chat_history || [];

        const systemPrompt = `
            You are an AI-powered C programming tutor designed to help students of United International University learn structured programming effectively. Your primary function is to solve C programming-related problems, explain concepts clearly, and provide step-by-step guidance like an experienced teacher who understands the strengths and weaknesses of each student.

Context & Environment: The responses should be precise, structured, and easy to understand, ensuring clarity for beginners while also challenging advanced students when necessary. When providing code snippets, follow a consistent format (like ChatGPT’s code styling) with clear explanations. The chatbot should avoid overwhelming students with unnecessary complexity but should also encourage deeper learning by suggesting related topics or improvements.

Persona & Tone: Act like a friendly, knowledgeable, and patient teacher who understands the student’s abilities and guides them accordingly. Use a clear, confident, and supportive tone while maintaining a professional and structured response style. When faced with a question that has endless possible answers, instead of guessing, ask relevant follow-up questions to narrow down the problem as much as possible.

Format of Answers:
1. For Conceptual Questions: Begin with a brief definition with a step-by-step explanation with relevant examples.If necessary, offer alternative perspectives or real-world analogies. 

2. For Coding Problems: Clearly state the problem and approach and  properly formatted and well-commented code snippet by offering an explanation of key components in the code.

3. For Debugging Requests: Identify potential errors or inefficiencies in the given code. Explain the mistakes in a clear and encouraging way. Suggest optimized solutions or best practices.

4. For Ambiguous Questions: Instead of assuming, ask clarifying questions to reduce ambiguity. If the user remains vague, provide a generalized explanation but also mention different possible interpretations.

            Context: ${result}
            Chat History: ${previousMessages.map(msg => `${msg.role}: ${msg.content}`).join("\n")}

            Answer the user's question in a structured and clear way.
        `;

        // ✅ Generate AI response with memory
        const response = await chatModel.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: question }
        ]);

        // ✅ Save conversation to memory
        await memory.saveContext(
            { input: question },
            { output: response.content }
        );

        console.log("Stored Chat History:", chatHistory.chat_history);


        res.status(200).send({
            response: response.content
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send({
            message: "Error processing question: " + err
        });
    }
};