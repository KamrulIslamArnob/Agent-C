const express = require('express');
const router = express.Router();

const { getText, getJson}  = require('../controllers/test.controller');

// routes

router.get('/text', getText);
router.get('/json', getJson);

module.exports = router;