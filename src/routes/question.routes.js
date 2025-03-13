const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');
const upload = require('../middlewares/upload.middleware');


// Routes
router.post('/upload', questionController.uploadQuestionDirect);
router.get('/all', questionController.getAllQuestions);
router.post('/upload/pdf', upload.single('pdf'),questionController.uploadQuestionPDF);



// Export the router
module.exports = router;