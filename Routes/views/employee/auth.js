const express = require('express');

const { body } = require('express-validator');

const authController = require('../../../Controllers/auth');

const appRoute = express.Router();

const {
  employeeSignIn,
  employeeSignup,
} = require('../../../Controllers/views/employee/auth');

appRoute.get('/employee-sign-in', employeeSignIn);
appRoute.get('/employee-sign-up', employeeSignup);
appRoute.post(
  '/employee-sign-in',
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
  authController.postEmployeeLogin,
);
module.exports = appRoute;
