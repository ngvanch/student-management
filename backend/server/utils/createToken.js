const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.TOKEN_LIFETIME,
  });
};

module.exports = { createToken };
