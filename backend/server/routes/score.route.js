const express = require('express');
const router = express.Router();
const { protectMiddleware } = require('../middlewares/protectRoutes');
const ScoreController = require('../controllers/score.controller');

router
  .route('/')
  .get(protectMiddleware, ScoreController.getAll)
  .post(protectMiddleware, ScoreController.addScore);

router
  .route('/:id')
  .get(protectMiddleware, ScoreController.getScore)
  .put(protectMiddleware, ScoreController.updateScore)
  .delete(protectMiddleware, ScoreController.deleteScore);

module.exports = router;
