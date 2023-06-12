const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const protectMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    res.status(401);
    throw new Error('Authorization token required');
  }
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(_id);

    next();
  } catch (err) {
    res.status(401);
    throw new Error(err.message);
  }
});

module.exports = { protectMiddleware };
