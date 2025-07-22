const express = require('express');
const router = express.Router();
const { getAllReports, addNote } = require('../controllers/doctorActionsController');
const doctorAuth = require('../middleware/doctorAuth');

router.get('/doctor/reports', doctorAuth, getAllReports);
router.post('/doctor/note', doctorAuth, addNote);

module.exports = router;
