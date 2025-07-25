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
