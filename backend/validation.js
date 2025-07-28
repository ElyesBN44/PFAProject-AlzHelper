const { body, validationResult } = require('express-validator');

// Caregiver registration validation
const validateCaregiverRegister = [
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Caregiver login validation
const validateCaregiverLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Doctor registration validation
const validateDoctorRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Doctor login validation
const validateDoctorLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Report creation validation
const validateReport = [
  body('symptoms').isArray({ min: 1 }).withMessage('Symptoms array is required'),
  body('symptoms.*.name').notEmpty().withMessage('Symptom name is required'),
  body('symptoms.*.severity').isIn(['mild', 'moderate', 'severe']).withMessage('Severity must be mild, moderate, or severe'),
];

// Note creation validation
const validateNote = [
  body('reportId').notEmpty().withMessage('reportId is required'),
  body('comment').notEmpty().withMessage('Comment is required'),
];

// Patient note creation validation
const validatePatientNote = [
  body('patientId').notEmpty().withMessage('patientId is required'),
  body('comment').notEmpty().withMessage('Comment is required'),
];

// Middleware to handle validation errors
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateCaregiverRegister,
  validateCaregiverLogin,
  validateDoctorRegister,
  validateDoctorLogin,
  validateReport,
  validateNote,
  validatePatientNote,
  handleValidation,
}; 