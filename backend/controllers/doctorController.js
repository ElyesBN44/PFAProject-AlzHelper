const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ doctorId: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, doctorId: doctor._id, name: doctor.name });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
