const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const result = await mongodb.getDatabase().db().collection('courses').find();
        const courses = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while fetching courses' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const courseId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('courses').find({ _id: courseId });
        const courses = await result.toArray();
        if (courses.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(courses[0]);
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while fetching the course' });
    }
};

const createCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const course = {
            courseCode: req.body.courseCode,
            courseName: req.body.courseName,
            instructor: req.body.instructor,
            semester: req.body.semester
        };
        const response = await mongodb.getDatabase().db().collection('courses').insertOne(course);
        if (response.acknowledged) {
            res.status(201).send();
        } else {
            res.status(500).json({ error: response.error || 'Some error occurred while creating the course' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while creating the course' });
    }
};

const updateCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Course ID is not valid' });
    }
    try {
        const courseId = new ObjectId(req.params.id);
        const course = {
            courseCode: req.body.courseCode,
            courseName: req.body.courseName,
            instructor: req.body.instructor,
            semester: req.body.semester
        };
        const response = await mongodb.getDatabase().db().collection('courses').replaceOne({ _id: courseId }, course);
        if (response.modifiedCount > 0) {
            res.status(204).send('The course has been updated');
        } else {
            res.status(500).json({ error: response.error || 'Some error occurred while updating the course' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while updating the course' });
    }
};

const deleteCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Course ID is not valid' });
    }
    try {
        const courseId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('courses').deleteOne({ _id: courseId });
        if (response.deletedCount > 0) {
            res.status(204).send('Course deleted');
        } else {
            res.status(500).json({ error: response.error || 'Some error occurred while deleting the course' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while deleting the course' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createCourse,
    updateCourse,
    deleteCourse,
};
