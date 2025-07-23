const express = require('express');
const router = express.Router();
const { getAllReports, addNote, getNotesForReport, getAllNotes } = require('../controllers/doctorActionsController');
const doctorAuth = require('../middleware/doctorAuth');
const { validateNote, handleValidation } = require('../validation');

router.get('/doctor/reports', doctorAuth, getAllReports);
router.post('/doctor/note', doctorAuth, validateNote, handleValidation, addNote);
router.get('/doctor/notes/:reportId', doctorAuth, getNotesForReport);
router.get('/doctor/notes', doctorAuth, getAllNotes);

module.exports = router;
