const express = require('express');
const router = express.Router();
const { protectMiddleware } = require('../middlewares/protectRoutes');
const AuthController = require('../controllers/auth.controller');

router.route('/login').post(AuthController.login);
router.route('/register').post(AuthController.register);
router
  .route('/me')
  .get(protectMiddleware, AuthController.getMe)
  .put(protectMiddleware, AuthController.updateProfile);

module.exports = router;
