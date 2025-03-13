const Exam = require('../models/question.model');
const parserService = require('../services/pdf-parser.services');

// upload question directly to the database
exports.uploadQuestionDirect = async (req,res)=>{
    try {
        const exam = new Exam(req.body);
        await exam.save();
        res.status(201).json({ message: 'Exam created successfully', exam });
    } catch (error) {
        res.status(400).json({ message: 'Error creating exam', error });
    }
}

// upload question from pdf file
exports.uploadQuestionPDF = async (req, res)=> {
    try{
        if(!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Extract text from the PDF file
        const pdfPath = req.file.path;
        
        const text = await parserService.extractTextFromPDF(pdfPath);
        


        // const questions = parserService.parseQuestions(text);

        // console.log(questions);

        res.status(200).json({
            message: 'PDF processed successfully',
            text: text
        });

    }catch(error){
        res.status(500).json({ message: 'Error uploading PDF', error });
    }
}


// Get all questions from the database (full instances)
exports.getAllQuestions = async (req, res) => {
    try {
        // Fetch all exams from the database
        const exams = await Exam.find({});

        // Extract all questions from the exams
        const allQuestions = exams.flatMap(exam => 
            exam.exams.flatMap(examItem => examItem.questions)
        );

        // Return the full question instances
        res.status(200).json({
            total: allQuestions.length,
            questionsList: allQuestions
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
};