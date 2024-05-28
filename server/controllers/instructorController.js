const { Instructor } = require('../models/models');

exports.createInstructor = async (req, res) => {
    const { name, email } = req.body;
    try {
        const newInstructor = new Instructor({ name, email });
        await newInstructor.save();
        res.status(201).json({
            _id: newInstructor._id,
            name: newInstructor.name,
            email: newInstructor.email
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllInstructors = async (req, res) => {
    try {
      const instructors = await Instructor.find();
      res.json(instructors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };