const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/doctorController');
const { validateDoctorRegister, validateDoctorLogin, handleValidation } = require('../validation');

router.post('/doctor/register', validateDoctorRegister, handleValidation, register);
router.post('/doctor/login', validateDoctorLogin, handleValidation, login);

module.exports = router;
