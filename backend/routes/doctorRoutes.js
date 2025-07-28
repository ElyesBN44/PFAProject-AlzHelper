const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/doctorController');
const { validateDoctorRegister, validateDoctorLogin, handleValidation } = require('../validation');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/doctor/register', validateDoctorRegister, handleValidation, register);
router.post('/doctor/login', validateDoctorLogin, handleValidation, login);

// Add the getAllDoctors route here
router.get('/doctors', authMiddleware, async (req, res) => {
  try {
    const Doctor = require('../models/Doctor');
    const doctors = await Doctor.find({}, 'name email _id');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch doctors', error: error.message });
  }
});

module.exports = router;
