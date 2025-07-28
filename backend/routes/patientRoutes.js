const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const doctorAuth = require('../middleware/doctorAuth');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new patient
router.post('/', authMiddleware, patientController.createPatient);

// Get all patients
router.get('/', authMiddleware, patientController.getAllPatients);

// Get a single patient by ID
router.get('/:id', patientController.getPatientById);

// Delete a patient by ID
router.delete('/:id', patientController.deletePatient);

module.exports = router; 