const express = require('express');
const router = express.Router();
const { createReport, getReportsByPatient } = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateReport, handleValidation } = require('../validation');

// Test route to verify registration
router.get('/reports/test', (req, res) => {
  res.json({ message: 'Report routes are working!' });
});

router.post('/report', authMiddleware, validateReport, handleValidation, createReport);
router.get('/reports/patient/:id', authMiddleware, getReportsByPatient);

module.exports = router;
