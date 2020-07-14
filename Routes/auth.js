/* eslint-disable comma-dangle */
const express = require('express');
const { body } = require('express-validator');
const { authorize } = require('../Middleware/index');
const { UserValidation } = require('../Utils/validators/user-validator-new');

const {
  adminLogin,
  postEmployeeLogin,
  postEmployerLogin,
  forgotPassword,
  resetPassword,
  resendVerificationLink,
  updatePassword,
  superAdminLogin,
} = require('../Controllers/auth');

const { verifyEmail } = require('../Controllers/employee/employee-signup');

const router = express.Router();

// Admin Login
// router.post('/admin-login', UserValidation.validateLogin, adminLogin);
// router.post('/employer-login', UserValidation.validateLogin, postEmployerLogin);
// // Employee Login
// router.post('/employee/login', UserValidation.validateLogin, postEmployeeLogin);
router.post(
  '/forgot-password',
  UserValidation.resendVerificationLink,
  forgotPassword,
);

router.post('/superadmin-login', UserValidation.validateLogin, superAdminLogin);
router.put(
  '/reset-password/:resettoken',
  UserValidation.resetPassword,
  resetPassword,
);
router.post(
  '/email/verify/resend',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail(),
  ],
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
