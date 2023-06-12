const express = require('express');
const router = express.Router();
const { protectMiddleware } = require('../middlewares/protectRoutes');
const SubjectController = require('../controllers/subject.controller');

router
  .route('/')
  .get(SubjectController.getAll)
  .post(protectMiddleware, SubjectController.addSubject);

router
  .route('/:id')
  .get(protectMiddleware, SubjectController.getSubject)
  .put(protectMiddleware, SubjectController.updateSubject)
  .delete(protectMiddleware, SubjectController.deleteSubject);

module.exports = router;
