const Patient = require('../models/Patient');

// Create a new patient
exports.createPatient = async (req, res) => {
  try {
    const { name, age, gender, contact, picture, assignedDoctorId } = req.body;
    
    // Set doctorId based on user type and assignment
    let doctorId = null;
    
    if (req.user && req.user.id) {
      if (req.user.role === 'doctor') {
        doctorId = req.user.id; // Doctor creating their own patient
      } else if (req.user.role === 'caregiver' && assignedDoctorId) {
        doctorId = assignedDoctorId; // Caregiver assigning to a doctor
      }
    }
    
    const patient = new Patient({ 
      name, 
      age, 
      gender, 
      contact, 
      picture, 
      doctorId
    });
    await patient.save();
    
    // Note: We don't update caregiver's doctorId anymore to avoid losing access to existing patients
    
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all patients for the logged-in user (doctor or caregiver)
exports.getAllPatients = async (req, res) => {
  try {
    let patients = [];
    
    if (req.user && req.user.id) {
      if (req.user.role === 'doctor') {
        // Doctor sees their own patients
        patients = await Patient.find({ doctorId: req.user.id });
      } else if (req.user.role === 'caregiver') {
        // Caregiver sees patients of their assigned doctor
        const Caregiver = require('../models/Caregiver');
        const caregiver = await Caregiver.findById(req.user.id);
        if (caregiver && caregiver.doctorId) {
          patients = await Patient.find({ doctorId: caregiver.doctorId });
        }
      }
    }
    
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a patient by ID
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 