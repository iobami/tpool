const express = require('express');

const { body } = require('express-validator');

const appRoute = express.Router();

const authController = require('../../../Controllers/auth');

const { employerSignIn } = require('../../../Controllers/views/employer/auth');
const { employerSignup } = require('../../../Controllers/views/employer/auth');

appRoute.get('/employer/login', employerSignIn);
appRoute.get('/employer/register', employerSignup);
appRoute.post(
  '/employer-sign-in',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postEmployerLogin,
);
module.exports = appRoute;
