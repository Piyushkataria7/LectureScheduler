const express = require('express');
const router = express.Router();
const { createCourse } = require('../controllers/courseController');
const { authenticateJwt } = require('../middleware/authMiddleware');

router.post('/courses', authenticateJwt, createCourse);

module.exports = router;
