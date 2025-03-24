const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const result = await mongodb.getDatabase().db().collection('students').find();
        const students = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while fetching students' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const studentId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('students').find({ _id: studentId });
        const students = await result.toArray();
        if (students.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students[0]);
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while fetching the student' });
    }
};

const createStudent = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const student = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            major: req.body.major,
            graduationYear: req.body.graduationYear,
            GPA: req.body.GPA,
            attendanceMode: req.body.attendanceMode,
            courses: req.body.courses
        };
        const response = await mongodb.getDatabase().db().collection('students').insertOne(student);
        if (response.acknowledged) {
            res.status(201).send();
        } else {
            res.status(500).json({ error: response.error || 'Some error occurred while creating the student' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while creating the student' });
    }
};

const updateStudent = async (req, res) => {
    //#swagger.tags=['Students']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Student ID is not valid' });
    }
    try {
        const studentId = new ObjectId(req.params.id);
        const student = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            major: req.body.major,
            graduationYear: req.body.graduationYear,
            GPA: req.body.GPA,
            attendanceMode: req.body.attendanceMode,
            courses: req.body.courses
        };
        const response = await mongodb.getDatabase().db().collection('students').replaceOne({ _id: studentId }, student);
        if (response.modifiedCount > 0) {
            res.status(204).send('The student has been updated');
        } else {
            res.status(500).json({ error: response.error || 'Some error occurred while updating the student' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while updating the student' });
    }
};

const deleteStudent = async (req, res) => {
    //#swagger.tags=['Students']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Student ID is not valid' });
    }
    try {
        const studentId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('students').deleteOne({ _id: studentId });
        if (response.deletedCount > 0) {
            res.status(204).send('Student deleted');
        } else {
            res.status(500).json({ error: response.error || 'Some error occurred while deleting the student' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while deleting the student' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createStudent,
    updateStudent,
    deleteStudent,
};
