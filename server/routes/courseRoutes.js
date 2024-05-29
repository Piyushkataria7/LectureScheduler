const express = require('express');
const router = express.Router();
const { createCourse, Courses, updateCourse } = require('../controllers/courseController');
const { authenticateJwt } = require('../middleware/authMiddleware');

router.post('/courses', authenticateJwt, createCourse);

router.get('/courses', authenticateJwt, Courses);

router.put('/courses/:coursesId', authenticateJwt, updateCourse);

module.exports = router;
