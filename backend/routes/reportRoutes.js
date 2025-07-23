const express = require('express');
const router = express.Router();
const { createReport } = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateReport, handleValidation } = require('../validation');

router.post('/report', authMiddleware, validateReport, handleValidation, createReport);

module.exports = router;
