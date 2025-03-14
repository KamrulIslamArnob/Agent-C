const express = require('express');
const router = express.Router();
const queryController = require('../controllers/query.controller');


// routes
router.post('/ask',queryController.askQuestion);

module.exports = router;