const Report = require('../models/Report');
const Symptom = require('../models/Symptom');

exports.createReport = async (req, res) => {
  try {
    const { symptoms } = req.body;
    const caregiverId = req.user.id; // populated by authMiddleware

    // Create symptom entries
    const createdSymptoms = await Symptom.insertMany(symptoms);

    // Create report
    const report = new Report({
      caregiverId,
      symptoms: createdSymptoms.map(s => s._id)
    });

    await report.save();

    res.status(201).json({ message: 'Report created successfully', report });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create report', error: error.message });
  }
};
