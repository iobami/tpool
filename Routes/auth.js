/* eslint-disable comma-dangle */
const express = require('express');
const { body } = require('express-validator');
const { authorize } = require('../Middleware/index');
const { UserValidation } = require('../Utils/validators/user-validator-new');
const authController = require('../Controllers/auth');

const {
  registerEmployer,
  userLogin,
  forgotPassword,
  resetPassword,
  resendVerificationLink,
  updatePassword,
  superAdminLogin,
} = require('../Controllers/auth');

const {
  create,
  verifyEmail,
} = require('../Controllers/employee/employee-signup');

const router = express.Router();
router.post('/employee-signup',
  [
    body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
    body('password').isLength({ min: 8 })
      .withMessage('Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/)
      .withMessage('Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)')
  ],
  create);
router.post('/employer-signup',
  [
    body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
    body('password').isLength({ min: 8 })
      .withMessage('Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/)
      .withMessage('Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)')
  ],
  registerEmployer);
router.post('/admin-login', UserValidation.validateLogin, userLogin);
router.post('/employer-login', UserValidation.validateLogin, userLogin);
router.post('/employee-login', UserValidation.validateLogin, userLogin);
router.post(
  '/forgot-password',
  UserValidation.resendVerificationLink,
  forgotPassword,
);
router.post('/logout', authController.postLogout);
router.post('/superadmin-login', UserValidation.validateLogin, superAdminLogin);
router.put(
  '/reset-password/:resettoken',
  UserValidation.resetPassword,
  resetPassword,
);
router.put(
  '/email/verify/resend',
  UserValidation.resendVerificationLink,
  resendVerificationLink,
);
router.get('/email/verify', verifyEmail);
router.put(
  '/update-password/:userId',
  authorize(),
  UserValidation.updatePassword,
  updatePassword,
);
module.exports = router;
