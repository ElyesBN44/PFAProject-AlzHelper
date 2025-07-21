const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();


const authRoutes = require('./routes/authRoutes');


const app = express();


app.use(cors());
app.use(express.json());


app.use('/api', authRoutes); // /api/caregiver/login


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
