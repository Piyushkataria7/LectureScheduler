const { Course } = require('../models/models');

exports.createCourse = async (req, res) => {
    const { name, level, description, image } = req.body;
    try {
        const newCourse = new Course({ name, level, description, image });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
