const asyncHandler = require('express-async-handler');
const Class = require('../models/class.model');

/**
 * @desc Get all classes
 * @route  /api/v1/classes/
 * @method GET
 * @access public
 */
exports.getAll = asyncHandler(async (req, res) => {
  const classes = await Class.find({});
  res
    .status(201)
    .json({ success: true, count: classes.length, data: classes });
});

/**
 * @desc Get single class
 * @route /api/v1/classes/:id
 * @method GET
 * @access public
 */
exports.getClass = asyncHandler(async (req, res) => {
  const _class = await Class.findById(req.params.id);
  if (!_class) {
    res.status(404);
    throw new Error('Class not found');
  }

  res.status(201).json({ success: true, data: _class });
});

/**
 * @desc Add Class
 * @route /api/v1/classes
 * @method POST
 * @access private
 * @requires TOKEN(Admin)
 */
exports.addClass = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error(
      'User not authorized, administrator permission required'
    );
  }

  const _class = await Class.create(req.body);

  res.status(201).json({ success: true, data: _class });
});

/**
 * @desc Update Class
 * @route /api/v1/classes/:id
 * @method PUT
 * @access private
 * @requires TOKEN
 */
exports.updateClass = asyncHandler(async (req, res) => {
  let _class = await Class.findById(req.params.id);
  if (!_class) {
    res.status(404);
    throw new Error('Class not found');
  }

  _class = await Class.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ success: true, data: _class });
});

/**
 * @desc Delete Class
 * @route /api/v1/classs/:id
 * @method DELETE
 * @access private
 * @requires TOKEN(Admin)
 */
exports.deleteClass = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error(
      'User not authorized, administrator permission required'
    );
  }

  let _class = await Class.findById(req.params.id);
  if (!_class) {
    res.status(404);
    throw new Error('Class not found');
  }

  await _class.delete();

  res.status(201).json({ success: true, data: {} });
});
