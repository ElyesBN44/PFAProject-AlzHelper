const express = require('express');
const router = express.Router();
const { login } = require('../controllers/doctorController');

router.post('/doctor/login', login);

module.exports = router;
