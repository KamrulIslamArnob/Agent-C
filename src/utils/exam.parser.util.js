const Exam = require("../models/question.model");

async function createExamFromJSON(examData) {
    try {
        const exam = new Exam(examData);
        await exam.validate();
        return exam;
    } catch (error) {
        console.error("Error creating exam:", error);
        return null;
    }
}