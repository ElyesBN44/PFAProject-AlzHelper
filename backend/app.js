const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();


const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const doctorActionsRoutes = require('./routes/doctorActionsRoutes');
const patientRoutes = require('./routes/patientRoutes');

const app = express(); 

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes); // /api/caregiver/login
app.use('/api', reportRoutes);
app.use('/api', doctorRoutes);
app.use('/api', doctorActionsRoutes);
app.use('/api/patient', patientRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
