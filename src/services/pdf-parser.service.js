const fs = require("fs");
const pdf = require("pdf-parse");

// Extract text from PDF
async function extractTextFromPDF(pdfPath) {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    return data.text;
}

// function parseQuestions(text) {
//     // Extract Exam Details
//     const examDetailsRegex = /(\w+ Exam):: Trimester: (.*?) \n.*?Course Code: (.*?), Course Title: (.*?) \nTotal Marks: (\d+)\s+Duration: ([\d:]+ hours)/s;
//     const match = text.match(examDetailsRegex);
    
//     if (!match) {
//         return { message: "Exam details not found" };
//     }

//     const [, exam_type, trimester, course_code, course_title, total_marks, duration] = match;

//     // Extract Questions
//     const questions = [];
//     const questionRegex = /Q\.(\d+)\s+\n(.*?)(?=(Q\.\d+|$))/gs;
//     let questionMatch;

//     while ((questionMatch = questionRegex.exec(text)) !== null) {
//         const [, number, content] = questionMatch;

//         const parts = content
//             .trim()
//             .split(/\n\s*\n/) // Splitting parts based on blank lines
//             .map((part, index) => {
//                 const partLines = part.trim().split("\n");
//                 const part_id = String.fromCharCode(97 + index); // "a", "b", "c", etc.

//                 let text = "", codeSnippet = "", marks = 0;
//                 let questionType = "identification"; // Default type, to be inferred

//                 for (let line of partLines) {
//                     if (/\[\s*\d+\s*\]/.test(line)) { // Extracts marks from "[3]" format
//                         marks = parseInt(line.match(/\d+/)[0], 10);
//                     } else if (line.includes("#include") || line.includes("int main")) { // Detects C code
//                         codeSnippet += line + "\n";
//                         questionType = "code_fix"; // Code-related question
//                     } else {
//                         text += line + " ";
//                     }
//                 }

//                 // Determine question type
//                 if (/trace|show changes|manually trace/i.test(text)) {
//                     questionType = "tracing";
//                 } else if (/find the output|output of/i.test(text)) {
//                     questionType = "output_prediction";
//                 } else if (/write a program|complete program/i.test(text)) {
//                     questionType = "programming";
//                 } else if (/draw a flowchart/i.test(text)) {
//                     questionType = "flowchart";
//                 }

//                 return {
//                     part: part_id,
//                     questionText: text.trim() || null,
//                     codeSnippet: codeSnippet.trim() || null,
//                     marks,
//                     questionType
//                 };
//             });

//         questions.push({
//             questionNumber: parseInt(number, 10),
//             parts
//         });
//     }

//     console.log("Parsed Questions:", questions);

//     return {
//         message: "PDF processed successfully",
//         examTitle: `${exam_type} Exam`,
//         trimester: trimester.trim(),
//         courseCode: course_code.trim().toUpperCase(),
//         courseTitle: course_title.trim(),
//         totalMarks: parseInt(total_marks, 10),
//         duration: duration.trim(),
//         questions
//     };
// }

module.exports = { extractTextFromPDF };
