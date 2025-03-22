const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');
const validate = require('../validators/validator');


router.get('/', studentsController.getAll);

router.get('/:id', studentsController.getSingle);

// POST - Create a student with validation
router.post(
    '/',
    validate.studentRules(),     // Validate request body
    validate.checkData,          // Check for validation errors
    studentsController.createStudent
  );
  
  // PUT - Update a student with validation
  router.put(
    '/:id',
    validate.studentRules(),     // Validate request body
    validate.checkData,          // Check for validation errors
    studentsController.updateStudent
  );
  
  // DELETE student by ID
  router.delete('/:id', studentsController.deleteStudent);

module.exports = router;