const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');


// Routes
router.post('/upload', questionController.uploadQuestionDirect);
router.get('/all', questionController.getAllQuestions);



// Export the router
module.exports = router;