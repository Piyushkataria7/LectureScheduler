const { Admin } = require('../models/models');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/authMiddleware');

exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        let admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        admin = new Admin({ username, password });
        await admin.save();

        const payload = { admin: { id: admin.id } };
        const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin || admin.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { admin: { id: admin.id } };
        const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
