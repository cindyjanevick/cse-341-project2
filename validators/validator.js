const { body, validationResult } = require('express-validator');
const validate = {};

validate.studentRules = () => {
    return [
        body('name')
      .exists({ checkFalsy: true })
      .withMessage('Name is required')
      .isString()
      .withMessage('Name must be a string')
      .isLength({ min: 1 })
      .withMessage('Name cannot be empty'),
    body('email')
      .exists({ checkFalsy: true })
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
    body('age')
      .exists()
      .withMessage('Age is required')
      .isInt({ min: 1 })
      .withMessage('Age must be a positive integer'),
    body('major')
      .exists({ checkFalsy: true })
      .withMessage('Major is required')
      .isString()
      .withMessage('Major must be a string')
      .isLength({ min: 1 })
      .withMessage('Major cannot be empty'),
    body('graduationYear')
      .exists()
      .withMessage('Graduation year is required')
      .isInt({ min: 1900 })
      .withMessage('Graduation year must be a valid year'),
    body('GPA')
      .exists()
      .withMessage('GPA is required')
      .isFloat({ min: 0.0, max: 4.0 })
      .withMessage('GPA must be between 0.0 and 4.0'),
    body('attendanceMode')
      .exists({ checkFalsy: true })
      .withMessage('Attendance mode is required')
      .isIn(['online', 'in-person', 'hybrid'])
      .withMessage('Attendance mode must be online, in-person, or hybrid'),
    body('courses')
      .isArray({ min: 1 })
      .withMessage('Courses must be an array with at least one course'),
    body('courses.*')
      .isString()
      .withMessage('Each course must be a string'),
    ];
};

validate.courseRules = () =>{
    return [
        body('courseCode')
      .exists({ checkFalsy: true })
      .withMessage('Course code is required')
      .isString()
      .withMessage('Course code must be a string'),
    body('courseName')
      .exists({ checkFalsy: true })
      .withMessage('Course name is required')
      .isString()
      .withMessage('Course name must be a string'),
    body('instructor')
      .exists({ checkFalsy: true })
      .withMessage('Instructor is required')
      .isString()
      .withMessage('Instructor must be a string'),
    body('semester')
      .exists({ checkFalsy: true })
      .withMessage('Semester is required')
      .isString()
      .withMessage('Semester must be a string'),
  ];
};

// Shared Validation Result Checker
validate.checkData = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => err.msg),
      });
    }
    next();
  };
  
  module.exports = validate;