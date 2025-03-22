const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');
const validator = require('../validators/validator');


router.get('/', studentsController.getAll);

router.get('/:id', studentsController.getSingle);

// POST - Create a student with validation
router.post(
    '/',
    validator.studentRules(),     // Validate request body
    validator.checkData,          // Check for validation errors
    studentsController.createStudent
  );
  
  // PUT - Update a student with validation
  router.put(
    '/:id',
    validator.studentRules(),     // Validate request body
    validator.checkData,          // Check for validation errors
    studentsController.updateStudent
  );
  
  // DELETE student by ID
  router.delete('/:id', studentsController.deleteStudent);

module.exports = router;