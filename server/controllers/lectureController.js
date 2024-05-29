const { Lecture } = require('../models/models');

exports.createLecture = async (req, res) => {
    const { course, instructor, date } = req.body;
    try {
        const conflictingLecture = await Lecture.findOne({ instructor, date });
        if (conflictingLecture) {
            return res.status(400).json({ error: 'Instructor is already booked on this date' });
        }

        const newLecture = new Lecture({ course, instructor, date });
        await newLecture.save();
        res.status(201).json(newLecture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLectureById = async (req, res) => {
    const { lectureId } = req.params;
    try {
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ error: 'Lecture not found' });
        }
        res.status(200).json({
            _id: lecture._id,
            course: lecture.course,
            instructor: lecture.instructor._id, 
            instructorName: lecture.instructor.name,
            instructorEmail: lecture.instructor.email,
            date: lecture.date
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

