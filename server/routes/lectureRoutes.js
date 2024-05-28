const express = require('express');
const router = express.Router();
const { createLecture, getLectureById } = require('../controllers/lectureController');
const { authenticateJwt } = require('../middleware/authMiddleware');

router.post('/lectures', authenticateJwt, createLecture);

router.get('/lectures/:lectureId', authenticateJwt ,getLectureById);

module.exports = router;
