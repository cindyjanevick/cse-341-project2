const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');
// const Validate = require('../validators/validator');
const validate = require('../validators/validator');

router.get('/', coursesController.getAll);

router.get('/:id', coursesController.getSingle);

// POST - Create a course with validation
router.post(
    '/',
    validate.courseRules(),      // Validate request body
    validate.checkData,          // Check for validation errors
    coursesController.createCourse
  );
  
  // PUT - Update a course with validation
  router.put(
    '/:id',
    validate.courseRules(),      // Validate request body
    validate.checkData,          // Check for validation errors
    coursesController.updateCourse
  );
  
  // DELETE course by ID
  router.delete('/:id', coursesController.deleteCourse);

module.exports = router;