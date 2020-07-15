const express = require('express');

const { body } = require('express-validator');

const appRoute = express.Router();

const authController = require('../../../Controllers/auth');

const { employerSignIn } = require('../../../Controllers/views/employer/auth');
const { employerSignup } = require('../../../Controllers/views/employer/auth');
const { registerEmployer, registerEmployerOrg } = require('../../../Controllers/auth');

appRoute.get('/employer/login', employerSignIn);
appRoute.get('/employer/register', employerSignup);
// Employer Register
appRoute.post(
  '/employer/register',
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
  registerEmployer,
);
appRoute.post(
  '/employer/registerOrganization',
  [
    body('orgName', 'Organization name cannot be empty').notEmpty(),
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
  registerEmployerOrg,
);
appRoute.post(
  '/employer/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 8 })
      // .isAlphanumeric()
      .trim(),
  ],
  authController.postEmployerLogin,
);
module.exports = appRoute;
