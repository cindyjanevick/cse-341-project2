const mongodb = require('../data/database');
const ObjectId = require ('mongodb').ObjectId;

const getAll = async (req, res ) => {
    
    const result = await mongodb.getDatabase().db().collection('courses').find();
    result.toArray().then((courses) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(courses);
    });
};

const getSingle = async (req, res ) => {
    const courseId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('courses').find({_id: courseId});
    result.toArray().then((courses) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(courses[0]);
    });
};

module.exports ={
    getAll,
    getSingle
};