const express = require('express');
const router = express.Router();
const { createCourse, Courses, updateCourse, getCourseById } = require('../controllers/courseController');
const { authenticateJwt } = require('../middleware/authMiddleware');

router.post('/courses', authenticateJwt, createCourse);

router.get('/courses', authenticateJwt, Courses);

router.put('/courses/:coursesId', authenticateJwt, updateCourse);

router.get('/courses/:id', authenticateJwt, getCourseById);

module.exports = router;
