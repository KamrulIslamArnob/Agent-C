const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');

router.get('/text',testController.getText);
router.get('/json',testController.getJson);

module.exports = router;
