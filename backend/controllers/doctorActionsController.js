const Report = require('../models/Report');
const Note = require('../models/Note');
const Symptom = require('../models/Symptom');
const Doctor = require('../models/Doctor');

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('caregiverId', 'first_name last_name email')
      .populate('symptoms')
      .populate('patient');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reports', error: error.message });
  }
};

exports.addNote = async (req, res) => {
  try {
    const { reportId, comment } = req.body;
    const doctorId = req.user.id;

    const note = new Note({
      reportId,
      doctorId,
      comment
    });

    await note.save();

    res.status(201).json({ message: 'Note added successfully', note });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add note', error: error.message });
  }
};

// Add note to a patient
exports.addPatientNote = async (req, res) => {
  try {
    // Check if user is a doctor
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Only doctors can add patient notes' });
    }
    
    const { patientId, comment } = req.body;
    const doctorId = req.user.id;

    if (!patientId || !comment) {
      return res.status(400).json({ message: 'Patient ID and comment are required' });
    }

    const note = new Note({
      patientId,
      doctorId,
      comment
    });

    await note.save();

    res.status(201).json({ message: 'Patient note added successfully', note });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add patient note', error: error.message });
  }
};

// Get notes for a specific patient
exports.getPatientNotes = async (req, res) => {
  try {
    const { patientId } = req.params;
    const notes = await Note.find({ patientId })
      .populate('doctorId', 'name email')
      .sort({ createdAt: -1 }); // Most recent first
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch patient notes', error: error.message });
  }
};

exports.getNotesForReport = async (req, res) => {
  try {
    const notes = await Note.find({ reportId: req.params.reportId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
