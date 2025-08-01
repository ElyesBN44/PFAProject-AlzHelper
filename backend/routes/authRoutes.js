const express = require('express');
const router = express.Router();
const { registerCaregiver, loginCaregiver } = require('../controllers/authController');
const { validateCaregiverRegister, validateCaregiverLogin, handleValidation } = require('../validation');
const doctorAuth = require('../middleware/doctorAuth');

router.post('/caregiver/register', validateCaregiverRegister, handleValidation, registerCaregiver);
router.post('/caregiver/login', validateCaregiverLogin, handleValidation, loginCaregiver);

module.exports = router;
