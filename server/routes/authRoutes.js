const express = require('express');
const router = express.Router();
const { authenticateJwt } = require('../middleware/authMiddleware');
const { registerAdmin, loginAdmin } = require('../controllers/authController');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

module.exports = router;
