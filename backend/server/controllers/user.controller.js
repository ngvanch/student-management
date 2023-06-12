const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

/**
 * @desc Get all users
 * @route  /api/v1/users/
 * @method GET
 * @access private
 * @requires TOKEN(Admin)
 */
exports.getAll = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error(
      'User not authorized, administrator permission required'
    );
  }

  const users = await User.find({});

  res
    .status(201)
    .json({ success: true, count: users.length, data: users });
});

/**
 * @desc Get single user
 * @route /api/v1/users/:id
 * @method GET
 * @access private
 * @requires TOKEN(Admin)
 */
exports.getUser = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error(
      'User not authorized, administrator permission required'
    );
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(201).json({ success: true, data: user });
});

/**
 * @desc Add User
 * @route /api/v1/users
 * @method POST
 * @access private
 * @requires TOKEN(Admin)
 */
exports.addUser = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error(
      'User not authorized, administrator permission required'
    );
  }

  const user = await User.create(req.body);

  res.status(201).json({ success: true, data: user });
});

/**
 * @desc Update User
 * @route /api/v1/users/:id
 * @method PUT
 * @access private
 * @requires TOKEN(Same_UserID)
 */
exports.updateUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (req.user.id !== user._id.toString() && !req.user.isAdmin) {
    res.status(401);
    throw new Error('User not authorized');
  }
  if (req.body.isAdmin && !req.user.isAdmin) {
    res.status(401);
    throw new Error(
      'User not allowed to change account type to Administrator'
    );
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ success: true, data: user });
});

/**
 * @desc Delete User
 * @route /api/v1/users/:id
 * @method DELETE
 * @access private
 * @requires TOKEN(Same_UserID)
 */
exports.deleteUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (req.user.id !== user._id.toString() && !req.user.isAdmin) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await user.delete();

  res.status(201).json({ success: true, data: {} });
});
