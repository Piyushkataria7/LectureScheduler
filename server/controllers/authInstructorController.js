const { Instructor } = require('../models/models');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/authMiddleware');
  
exports.loginInstructor = async (req, res) => {
    const { name, email } = req.body;
    const user = await Instructor.findOne({ name, email });
    if (user) {
      const token = jwt.sign({ name, role: 'Instructor' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid Instructor credentials' });
    }
};
  
  