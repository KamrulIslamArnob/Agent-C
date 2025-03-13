const mongoose = require('mongoose');
const { Schema } = mongoose;

// exam schema
const examSchema = new Schema({
  exams: [
    {
      exam_id: { type: Number, required: true },
      type: { type: String, required: true },
      year: { type: Number, required: true },
      trimester: { type: String, required: true },
      course_code: { type: String, required: true },
      total_marks: { type: Number, required: true },
      duration: { type: String, required: true },
      questions: [
        {
          question_id: { type: Number, required: true },
          number: { type: Number, required: true },
          part: { type: String, required: false },
          text: { type: String, required: true },
          code: { type: String, required: false },
          marks: { type: Number, required: true },
          samples: [
            {
              input_main: { type: String, required: false },
              input_sub: { type: String, required: false },
              output: { type: String, required: true }
            }
          ]
        }
      ]
    }
  ]
});

// exam model for mongoose
const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;