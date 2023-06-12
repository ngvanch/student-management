const express = require('express');
const router = express.Router();
const { protectMiddleware } = require('../middlewares/protectRoutes');
const ClassController = require('../controllers/class.controller');

router
  .route('/')
  .get(ClassController.getAll)
  .post(protectMiddleware, ClassController.addClass);

router
  .route('/:id')
  .get(ClassController.getClass)
  .put(protectMiddleware, ClassController.updateClass)
  .delete(protectMiddleware, ClassController.deleteClass);

module.exports = router;
