const { Course } = require('../models/models');

exports.createCourse = async (req, res) => {
    const { name, level, description, image } = req.body;
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json({ message: 'Course created successfully', courseId: course.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCourse = async (req,res)=>{
    console.log('Course ID:', req.params.courseId);
    console.log('Request Body:', req.body);

    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
      res.json({ message: 'Course updated successfully', course });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
}

exports.Courses = async (req,res)=>{
    const courses = await Course.find({});
    res.json({ courses });
}