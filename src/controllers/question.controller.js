const { console } = require('inspector');
const Exam = require('../models/question.model');
const parserService = require('../services/pdf-parser.services');
const fs = require('fs');
const path = require('path');
const gemini = require('../services/gemini.pdf.read.service');

// Upload question directly to the database
exports.uploadQuestionDirect = async (req, res) => {
    try {
        const exam = new Exam(req.body);
        await exam.save();
        res.status(201).json({ message: 'Exam created successfully', exam });
    } catch (error) {
        res.status(400).json({ message: 'Error creating exam', error });
    }
};



exports.uploadQuestionPDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No PDF file uploaded" });
        }

        // Extract text from PDF
        const pdfText = await parserService.extractTextFromPDF(req.file.path);


        const aiResponse = await gemini.getAiResponse(pdfText);

        if (!aiResponse) {
            return res.status(400).json({ message: "Failed to parse PDF content" });
        }
        
        return res.status(200).json({ message: "PDF processed successfully", data: aiResponse });
    } catch (error) {
        console.error("Error processing exam PDF:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};




// Get all questions from the database (full instances)
exports.getAllQuestions = async (req, res) => {
    try {
        // Fetch all exams with questions
        const exams = await Exam.find({}).lean();

        if (!exams || exams.length === 0) {
            return res.status(404).json({ message: "No exams found" });
        }

        // Extract all questions with full structure
        const allQuestions = exams.flatMap(exam =>
            exam.questions.map(question => ({
                examTitle: exam.examTitle,
                trimester: exam.trimester,
                courseCode: exam.courseCode,
                courseTitle: exam.courseTitle,
                questionNumber: question.questionNumber,
                parts: question.parts.map(part => ({
                    part: part.part,
                    questionText: part.questionText || "",
                    codeSnippet: part.codeSnippet || "",
                    marks: part.marks || 0,
                    questionType: part.questionType || "identification"
                }))
            }))
        );

        res.status(200).json({
            totalQuestions: allQuestions.length,
            questions: allQuestions
        });
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
