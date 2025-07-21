const express = require('express');
const router = express.Router();
const { loginCaregiver } = require('../controllers/authController');

router.post('/caregiver/login', loginCaregiver);

module.exports = router;
