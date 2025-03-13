const mongoose = require('mongoose');
const { Schema } = mongoose;

// Exam schema
const examSchema = new Schema({
  exam_id: { type: Number, required: true },
  type: { type: String, required: true }, // e.g., "Mid Term Exam"
  year: { type: Number, required: true }, // e.g., 2022
  trimester: { type: String, required: true }, // e.g., "Fall"
  course_code: { type: String, required: true }, // e.g., "CSE 1111"
  course_title: { type: String, required: true }, // e.g., "Structured Programming Language"
  total_marks: { type: Number, required: true }, // e.g., 30
  duration: { type: String, required: true }, // e.g., "1:45 hours"
  questions: [
    {
      question_id: { type: Number, required: true }, // Unique ID for the question
      number: { type: Number, required: true }, // Question number (e.g., 1, 2, 3)
      parts: [
        {
          part_id: { type: String, required: true }, // Part identifier (e.g., "a)", "b)")
          text: { type: String, required: true }, // Question text
          code: { type: String, required: false }, // Code snippet (if any)
          marks: { type: Number, required: true } // Marks for this part
        }
      ]
    }
  ]
});

// Exam model for Mongoose
const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;