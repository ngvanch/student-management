const asyncHandler = require('express-async-handler');
const Score = require('../models/score.model');

/**
 * @desc Get all scores
 * @route  /api/v1/scores/
 * @method GET
 * @access private
 * @requires TOKEN
 */
exports.getAll = asyncHandler(async (req, res) => {
  const scores = await Score.find({});
  res
    .status(201)
    .json({ success: true, count: scores.length, data: scores });
});

/**
 * @desc Get single score
 * @route /api/v1/scores/:id
 * @method GET
 * @access private
 * @requires TOKEN
 */
exports.getScore = asyncHandler(async (req, res) => {
  const score = await Score.find({ student: req.params.id });
  if (!score) {
    res.status(404);
    throw new Error('Score not found');
  }

  res.status(201).json({ success: true, data: score });
});

/**
 * @desc Add Score
 * @route /api/v1/scores
 * @method POST
 * @access private
 * @requires TOKEN
 */
exports.addScore = asyncHandler(async (req, res) => {
  const score = await Score.create(req.body);

  res.status(201).json({ success: true, data: score });
});

/**
 * @desc Update Score
 * @route /api/v1/scores/:id
 * @method PUT
 * @access private
 * @requires TOKEN
 */
exports.updateScore = asyncHandler(async (req, res) => {
  let score = await Score.findOne({ student: req.params.id });
  if (!score) {
    res.status(404);
    throw new Error('Score not found');
  }

  const scoreUpdate = req.body.subjectScore;
  for (let i = 0; i < scoreUpdate.length; i++) {
    for (let j = 0; j < score.subjectScore.length; j++) {
      if (scoreUpdate[i].subject == score.subjectScore[j].subject) {
        score.subjectScore[j] = scoreUpdate[i];
      }
    }
  }

  await score.save();

  res.status(201).json({ success: true, data: score });
});

/**
 * @desc Delete Score
 * @route /api/v1/scores/:id
 * @method DELETE
 * @access private
 * @requires TOKEN
 */
exports.deleteScore = asyncHandler(async (req, res) => {
  let score = await Score.find({ student: req.params.id });
  if (!score) {
    res.status(404);
    throw new Error('Score not found');
  }

  await score.delete();

  res.status(201).json({ success: true, data: {} });
});
