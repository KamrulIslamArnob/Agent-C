const fs = require('fs');
const pdf = require('pdf-parse');

// Extract text from PDF
async function extractTextFromPDF(pdfPath) {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    return data.text;
}

// Parse text into structured questions
function parseQuestions(text) {
    const questions = [];
    const questionRegex = /Question (\d+):\s*(.*?)\s*Marks:\s*(\d+)\s*Code:\s*(.*?)\s*Samples:\s*Input:\s*(.*?)\s*Output:\s*(.*?)(?=\nQuestion|\n*$)/gs;

    let match;
    while ((match = questionRegex.exec(text)) !== null) {
        const question = {
            question_id: parseInt(match[1]),
            text: match[2],
            marks: parseInt(match[3]),
            code: match[4],
            samples: [
                {
                    input_main: match[5],
                    input_sub: null,
                    output: match[6]
                }
            ]
        };
        questions.push(question);
    }

    return questions;
}

module.exports = { extractTextFromPDF, parseQuestions };