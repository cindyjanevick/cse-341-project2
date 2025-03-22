const mongodb = require('../data/database');
const ObjectId = require ('mongodb').ObjectId;

const getAll = async (req, res ) => {
    
    const result = await mongodb.getDatabase().db().collection('students').find();
    result.toArray().then((students) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    });
};

const getSingle = async (req, res ) => {
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('students').find({_id: studentId});
    result.toArray().then((students) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students[0]);
    });
};

const createStudent = async (req, res) => {
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
    } else{
        res.status(500).json(response.error || 'Some error ocurred while creating the student');
    }
    
};


const updateStudent = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Student ID is not valid')
    }
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
    const response = await mongodb.getDatabase().db().collection('students').replaceOne({_id: studentId}, student);
    if (response.modifiedCount >0) {
        res.status(204).send('The student has been updated');
    } else{
        res.status(500).json(response.error || 'Some error ocurred while updating the student');
    }
};

const deleteStudent = async (req, res) => {
    if(!ObjectId.isValid(req,params.id)){
        res.status(400).json('Student ID is not valid');
    }
    const studentId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('students').deleteOne({_id: studentId});
    if (response.deletedCount >0) {
        res.status(204).send('Student deleted');
    } else{
        res.status(500).json(response.error || 'Some error ocurred while deleting the student');
    }
};
module.exports ={
    getAll,
    getSingle,
    createStudent,
    updateStudent,
    deleteStudent,
};