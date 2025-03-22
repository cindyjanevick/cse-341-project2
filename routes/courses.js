const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');
const validator = require('../validators/validator');

router.get('/', coursesController.getAll);

router.get('/:id', coursesController.getSingle);

// POST - Create a course with validation
router.post(
    '/',
    validator.courseRules(),      // Validate request body
    validator.checkData,          // Check for validation errors
    coursesController.createCourse
  );
  
  // PUT - Update a course with validation
  router.put(
    '/:id',
    validator.courseRules(),      // Validate request body
    validator.checkData,          // Check for validation errors
    coursesController.updateCourse
  );
  
  // DELETE course by ID
  router.delete('/:id', coursesController.deleteCourse);

module.exports = router;