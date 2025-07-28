const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contact: { type: String, required: true },
  picture: { type: String }, // URL or filename for patient photo
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }, // Now optional
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema); 