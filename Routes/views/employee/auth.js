/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
const express = require('express');

const { body } = require('express-validator');

const authController = require('../../../Controllers/auth');
const signAuthController = require('../../../Controllers/employee/employee-signup');

const appRoute = express.Router();

const {
  employeeSignIn,
  employeeSignup,
} = require('../../../Controllers/views/employee/auth');

appRoute.get('/employee/login', employeeSignIn);
appRoute.get('/employee/register', employeeSignup);
appRoute.post(
  '/employee/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 8 })
      .trim(),
  ],
  authController.postEmployeeLogin,
);

// Employee Register
appRoute.post(
  '/employee/register',
  [
    body('firstname', 'Firstname cannot be empty').notEmpty(),
    body('lastname', 'Lastname cannot be empty').notEmpty(),
    body('phone', 'Phone cannot be empty').notEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage(
        'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)',
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/,
      )
      .withMessage(
        'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)',
      ),
    body('confirm_password', 'Passwords did not match').custom((value, { req }) => (value === req.body.password)),
    body('terms', 'Accept terms and condition to continue').equals('on'),
  ],
  signAuthController.create,
);

module.exports = appRoute;
