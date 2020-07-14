const express = require('express');

const { body } = require('express-validator');

const appRoute = express.Router();

const authController = require('../../../Controllers/auth');

const { employerSignIn } = require('../../../Controllers/views/employer/auth');
const { employerSignup } = require('../../../Controllers/views/employer/auth');
const { registerEmployer } = require('../../../Controllers/auth');

appRoute.get('/employer/login', employerSignIn);
appRoute.get('/employer/register', employerSignup);
<<<<<<< HEAD
=======
// Employer Register
>>>>>>> cd21d93397e8f81d51ac7ecd418a266177ab4246
appRoute.post(
  '/employer/register',
  [
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
  ],
  registerEmployer,
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
