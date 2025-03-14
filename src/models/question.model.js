const mongoose = require("mongoose");

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

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;