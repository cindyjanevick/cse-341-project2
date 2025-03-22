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

module.exports ={
    getAll,
    getSingle
};