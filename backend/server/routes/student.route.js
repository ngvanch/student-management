const express = require('express');
const router = express.Router();
const { protectMiddleware } = require('../middlewares/protectRoutes');
const StudentController = require('../controllers/student.controller');

router
  .route('/')
  .get(protectMiddleware, StudentController.getAll)
  .post(protectMiddleware, StudentController.addStudent);

router
  .route('/:id')
  .get(protectMiddleware, StudentController.getStudent)
  .put(protectMiddleware, StudentController.updateStudent)
  .delete(protectMiddleware, StudentController.deleteStudent);

module.exports = router;
