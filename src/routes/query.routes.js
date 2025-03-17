const express = require('express');
const router = express.Router();
const queryController = require('../controllers/query.controller');
const protect = require('../middlewares/authorization.middleware');

// Routes
router.post('/ask', protect, queryController.askQuestion);

module.exports = router;
