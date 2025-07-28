const express = require('express');
const router = express.Router();
const { getAllReports, addNote, getNotesForReport, getAllNotes, addPatientNote, getPatientNotes } = require('../controllers/doctorActionsController');
const authMiddleware = require('../middleware/authMiddleware');
const doctorAuth = require('../middleware/doctorAuth');
const { validateNote, validatePatientNote, handleValidation } = require('../validation');

router.get('/doctor/reports', doctorAuth, getAllReports);
router.post('/doctor/note', doctorAuth, validateNote, handleValidation, addNote);
router.get('/doctor/notes/:reportId', doctorAuth, getNotesForReport);
router.get('/doctor/notes', doctorAuth, getAllNotes);

// Patient notes routes
router.post('/doctor/patient-note', authMiddleware, validatePatientNote, handleValidation, addPatientNote);
router.get('/doctor/patient-notes/:patientId', authMiddleware, getPatientNotes);

module.exports = router;
