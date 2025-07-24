const Report = require('../models/Report');
const Symptom = require('../models/Symptom');

exports.createReport = async (req, res) => {
  try {
    const { symptoms, patient } = req.body;
    if (!patient) {
      return res.status(400).json({ message: 'Patient is required' });
    }
    const caregiverId = req.user.id; // populated by authMiddleware

    // Create symptom entries
    const createdSymptoms = await Symptom.insertMany(symptoms);

    // Create report
    const report = new Report({
      caregiverId,
      patient,
      symptoms: createdSymptoms.map(s => s._id)
    });

    await report.save();

    res.status(201).json({ message: 'Report created successfully', report });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create report', error: error.message });
  }
};

exports.getReportsByPatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const reports = await Report.find({ patient: patientId })
      .populate('symptoms')
      .populate('caregiverId', 'first_name last_name email');
    res.json({ reports });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reports for patient', error: error.message });
  }
};
