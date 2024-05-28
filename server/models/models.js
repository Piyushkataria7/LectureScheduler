const mongoose = require('mongoose');

// Instructor Schema
const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const Instructor = mongoose.model('Instructor', instructorSchema);

// Course Schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    lectures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture'
    }]
});

const Course = mongoose.model('Course', courseSchema);

// Lecture Schema
const lectureSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Lecture = mongoose.model('Lecture', lectureSchema);

// Admin Schema
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = {
    Instructor,
    Course,
    Lecture,
    Admin
};
