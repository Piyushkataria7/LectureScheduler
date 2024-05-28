const express = require('express');
const router = express.Router();
const { createInstructor } = require('../controllers/instructorController');
const { authenticateJwt } = require('../middleware/authMiddleware');

router.post('/instructors', authenticateJwt, createInstructor);

module.exports = router;
