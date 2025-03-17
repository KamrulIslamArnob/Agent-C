const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');
const upload = require('../middlewares/upload.middleware');
const protect = require('../middlewares/authorization.middleware');


// Routes
// router.post('/upload', questionController.uploadQuestionDirect);
// router.get('/all', questionController.getAllQuestions);

router.post('/upload/pdf', protect,upload.single('pdf'),questionController.uploadQuestion);



// Export the router
module.exports = router;