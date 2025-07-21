const Caregiver = require('../models/Caregiver');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerCaregiver = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password } = req.body;

    const existingCaregiver = await Caregiver.findOne({ email });
    if (existingCaregiver) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    
    const caregiver = new Caregiver({
      first_name,
      last_name,
      email,
      phone,
      password_hash
    });

    await caregiver.save();

    res.status(201).json({ message: 'Caregiver registered successfully' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginCaregiver = async (req, res) => {
  try {
    const { email, password } = req.body;

    const caregiver = await Caregiver.findOne({ email });
    if (!caregiver) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await caregiver.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const token = jwt.sign(
      { id: caregiver._id, role: 'caregiver' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ token, caregiver: { id: caregiver._id, first_name: caregiver.first_name } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerCaregiver, loginCaregiver };
