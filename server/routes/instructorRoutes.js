const express = require('express');
const router = express.Router();
const { createInstructor, getAllInstructors } = require('../controllers/instructorController');
const { authenticateJwt } = require('../middleware/authMiddleware');

router.post('/instructors', authenticateJwt, createInstructor);

router.get('/instructors', authenticateJwt, getAllInstructors);

module.exports = router;
