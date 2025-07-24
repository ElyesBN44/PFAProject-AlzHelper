const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const reportController = require('../controllers/reportController');

// Create a new patient
router.post('/', patientController.createPatient);

// Get all patients
router.get('/', patientController.getAllPatients);

// Get a single patient by ID
router.get('/:id', patientController.getPatientById);

// Get all reports for a specific patient
router.get('/:id/reports', reportController.getReportsByPatient);

module.exports = router; 