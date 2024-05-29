const express = require('express');
const router = express.Router();
const { authenticateJwt } = require('../middleware/authMiddleware');
const { loginInstructor } = require('../controllers/authInstructorController');

router.post('/login', authenticateJwt,loginInstructor);

module.exports = router;
