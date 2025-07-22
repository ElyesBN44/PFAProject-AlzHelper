const express = require('express');
const router = express.Router();
const { createReport } = require('../controllers/reportController');
const authenticate = require('../middleware/authMiddleware');

router.post('/caregiver/report', authenticate, createReport);

module.exports = router;
