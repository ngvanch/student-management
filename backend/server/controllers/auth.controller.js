const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { createToken } = require('../utils/createToken');

/**
 * @desc Login user
 * @route  /api/v1/auth/login
 * @method POST
 * @access public
 */
exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) {
    res.status(404);
    throw new Error('Email or password incorrect');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401);
    throw new Error('Password incorrect');
  }

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      fullname: user.fullname,
      token: createToken(user._id),
    },
  });
});

/**
 * @desc Register user
 * @route  /api/v1/auth/register
 * @method POST
 * @access private (internal use only)
 */
exports.register = asyncHandler(async (req, res) => {
  const userExist = await User.findOne({ username: req.body.username });

  if (userExist) {
    res.status(401);
    throw new Error('User already exists');
  }

  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      fullname: user.fullname,
      token: createToken(user._id),
    },
  });
});

/**
 * @desc Get Current User Profile
 * @route  /api/v1/auth/me
 * @method GET
 * @access private
 * @requires TOKEN(Same_UserID)
 */
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id);
  res.status(201).json({
    success: true,
    date: {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      token: createToken(user._id),
      fullname: user.fullname,
      gender: user.gender,
      dob: user.dob,
      address: user.address,
      email: user.email,
    },
  });
});

/**
 * @desc Update User Profile
 * @route  /api/v1/auth/me
 * @method PUT
 * @access private
 * @requires TOKEN(Same_UserID)
 */
exports.updateProfile = asyncHandler(async (req, res) => {
  const userExist = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const updateData = req.body;
  console.log(updateData);
});

/**
 * @desc Update password
 * @route  /api/v1/auth/password
 * @method PUT
 * @access private
 * @requires TOKEN(Same_UserID)
 */
exports.updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (oldPassword == newPassword) {
    res.status(403);
    throw new Error('Old password and new password can not be same');
  }

  let user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) {
    res.status(401);
    throw new Error('Old password incorrect');
  }

  user.password = newPassword;
  await user.save();

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      token: createToken(user._id),
    },
  });
});
