const asyncHandler = require('express-async-handler');
const Subject = require('../models/subject.model');

/**
 * @desc Get all subjects
 * @route  /api/v1/subjects/
 * @method GET
 * @access public
 */
exports.getAll = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({});
  res
    .status(201)
    .json({ success: true, count: subjects.length, data: subjects });
});

/**
 * @desc Get single subject
 * @route /api/v1/subjects/:id
 * @method GET
 * @access public
 */
exports.getSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) {
    res.status(404);
    throw new Error('Subject not found');
  }

  res.status(201).json({ success: true, data: subject });
});

/**
 * @desc Add Subject
 * @route /api/v1/subjects
 * @method POST
 * @access private
 * @requires TOKEN(Admin)
 */
exports.addSubject = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error(
      'User not authorized, administrator permission required'
    );
  }

  const subject = await Subject.create(req.body);

  res.status(201).json({ success: true, data: subject });
});

/**
 * @desc Update Subject
 * @route /api/v1/subjects/:id
 * @method PUT
 * @access private
 * @requires TOKEN
 */
exports.updateSubject = asyncHandler(async (req, res) => {
  let subject = await Subject.findById(req.params.id);
  if (!subject) {
    res.status(404);
    throw new Error('Subject not found');
  }

  subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ success: true, data: subject });
});

/**
 * @desc Delete Subject
 * @route /api/v1/subjects/:id
 * @method DELETE
 * @access private
 * @requires TOKEN(Admin)
 */
exports.deleteSubject = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error(
      'User not authorized, administrator permission required'
    );
  }

  let subject = await Subject.findById(req.params.id);
  if (!subject) {
    res.status(404);
    throw new Error('Subject not found');
  }

  await subject.delete();

  res.status(201).json({ success: true, data: {} });
});
