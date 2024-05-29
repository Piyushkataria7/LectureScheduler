const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const lectureRoutes = require('./routes/lectureRoutes');
const authRoutes = require('./routes/authRoutes');
const authInstructorRoutes = require('./routes/authInstructorRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/instructor', authInstructorRoutes);
app.use('/api', courseRoutes);
app.use('/api', instructorRoutes);
app.use('/api', lectureRoutes);

module.exports = app;
