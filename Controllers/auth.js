/* eslint-disable no-undef */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
// eslint-disable-next-line linebreak-style
/* eslint-disable prefer-destructuring */
/* eslint-disable operator-linebreak */
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4');
const { validationResult } = require('express-validator');
const model = require('../Models/index');

const jsonWT = require('../Utils/auth-token');
const asyncHandler = require('../Middleware/async');
const sendEmail = require('../Utils/sendEmail');

const {
  successResMsg,
  errorResMsg,
  sessionSuccessResMsg,
} = require('../Utils/response');

// const catchAsync = require('../Utils/catchAsync');

// eslint-disable-next-line operator-linebreak
const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.TALENT_POOL_DEV_URL
    : process.env.TALENT_POOL_FRONT_END_URL;

exports.registerEmployer = (req, res) => {
  (async () => {
    const employerUserData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone
    };
    try {
      // eslint-disable-next-line camelcase
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errResponse = errors.array({ onlyFirstError: true });
        req.flash('oldInput', employerUserData);
        req.flash('errors', errResponse);
        return res.redirect('/employer/register');
      }
      // Saving user details in session
      req.session.employeruserData = employerUserData;

      // encrypt password
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.password, salt);

      const userId = uuid();
      const userEmail = req.body.email;

      const basicInfo = {
        email: userEmail,
      };

      const token = jsonWT.signJWT(basicInfo);

      // check if email exist and create user
      const user = await model.User.findOne({
        where: { email: userEmail },
      });
      if (!user) {
        const userData = {
          email: userEmail,
          password: hashPassword,
          verification_token: token,
          role_id: 'ROL-EMPLOYER',
          user_id: userId,
        };
        // create new user and send verification mail
        try {
          await model.User.create(userData);
          // mail verification code to the user
          const verificationUrl = `${URL}/auth/email/verify?verification_code=${token}`;
          const message = `<p> Hi, thanks for registering, kindly verify your email using this <a href ='${verificationUrl}'>link</a></p>`;

          await sendEmail({
            email: req.body.email,
            subject: 'Email verification',
            message,
          });

          // return successResMsg(res, 201, data);
          req.flash('success', 'Verification email sent!');
          return res.redirect('/employer/register');
        } catch (err) {
          req.flash('oldInput', employerUserData);
          req.flash('error', 'An error Occoured');
          return res.redirect('/employer/register');
          // return errorResMsg(res, 500, err);
        }
      } else {
        req.flash('oldInput', employerUserData);
        req.flash('error', 'Someone has already registered this email');
        return res.redirect('/employer/register');
      }
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      req.flash('oldInput', employerUserData);
      req.flash('error', 'An error Occoured');
      return res.redirect('/employer/register');
    }
  })();
};

exports.registerEmployerOrg = (req, res) => {
  (async () => {
    const employerUserData = {
      organizationName: req.body.orgName,
      email: req.body.email,
    };
    try {
      // eslint-disable-next-line camelcase
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errResponse = errors.array({ onlyFirstError: true });
        req.flash('oldInput', employerUserData);
        req.flash('errors', errResponse);
        return res.redirect('/employer/register#company');
      }

      // Saving other user details in employer session
      req.session.employeruserData = employerUserData;

      // encrypt password
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.password, salt);

      const userId = uuid();
      const userEmail = req.body.email;

      const basicInfo = {
        email: userEmail,
      };

      const token = jsonWT.signJWT(basicInfo);

      // check if email exist and create user
      const user = await model.User.findOne({
        where: { email: userEmail },
      });
      if (!user) {
        const userData = {
          email: userEmail,
          password: hashPassword,
          verification_token: token,
          role_id: 'ROL-EMPLOYER',
          user_id: userId,
        };
        // create new user and send verification mail
        try {
          await model.User.create(userData);
          // mail verification code to the user
          const verificationUrl = `${URL}/auth/email/verify?verification_code=${token}`;
          const message = `<p> Hi, thanks for registering, kindly verify your email using this <a href ='${verificationUrl}'>link</a></p>`;

          await sendEmail({
            email: req.body.email,
            subject: 'Email verification',
            message,
          });

          // return successResMsg(res, 201, data);
          req.flash('success', 'Verification email sent!');
          return res.redirect('/employer/register');
        } catch (err) {
          req.flash('oldInput', employerUserData);
          req.flash('error', 'An Error occoured, try again.');
          return res.redirect('/employer/register#company');
          // return errorResMsg(res, 500, err);
        }
      } else {
        req.flash('oldInput', employerUserData);
        req.flash('error', 'Someone has already registered this email');
        return res.redirect('/employer/register#company');
      }
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      // return errorResMsg(res, 500, 'An error occurred');
      req.flash('oldInput', employerUserData);
      req.flash('error', 'An Error occoured, try again.');
      return res.redirect('/employer/register#company');
    }
  })();
};

exports.postEmployeeLogin = async (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  let currentUser;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('Pages/employee-sign-in', {
      path: '/employee/login',
      pageName: 'Employee Login',
      errorMessage: errors.array()[0].msg,
      success,
      isLoggedIn: req.session.isLoggedIn,
      oldInput: {
        email,
        password,
      },
      validationErrors: errors.array(),
    });
  }

  model.User.findOne({ where: { email, role_id: 'ROL-EMPLOYEE' } })
    .then(async (user) => {
      if (!user) {
        return res.status(422).render('Pages/employee-sign-in', {
          path: '/employee/login',
          pageName: 'Employee Login',
          errorMessage: 'Incorrect login details',
          success: req.flash('success'),
          isLoggedIn: req.session.isLoggedIn,
          oldInput: {
            email,
            password,
          },
          validationErrors: [],
        });
      }

      let userTypeId = null;

      const employee = await model.Employee.findOne({
        where: { user_id: user.user_id },
      });
      if (employee) {
        userTypeId = employee.employee_id;
      }

      if (user.status === '0') {
        return res.status(422).render('Pages/employee-sign-in', {
          path: '/employee/login',
          pageName: 'Employee Login',
          errorMessage: 'User is not verified',
          success: req.flash('success'),
          isLoggedIn: req.session.isLoggedIn,
          oldInput: {
            email,
            password,
          },
          validationErrors: [],
        });
      }

      if (user.block) {
        return res.status(422).render('Pages/employee-sign-in', {
          path: '/employee/login',
          pageName: 'Employee Login',
          errorMessage: 'User is blocked.',
          success: req.flash('success'),
          isLoggedIn: req.session.isLoggedIn,
          oldInput: {
            email,
            password,
          },
          validationErrors: [],
        });
      }
      currentUser = user;
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (valid) {
            const data = {
              email: currentUser.email,
              userRole: currentUser.role_id,
              userTypeId,
            };
            req.session.data = data;
            req.session.email = user.email;
            req.session.isLoggedIn = true;
            req.session.userId = user.user_id;
            req.session.employeeId = data.userTypeId;

            if (!data.userTypeId) {
              // req.flash('success', 'Login Successful!');
              res.redirect(
                '/employee/create/profile?success_message=Login Successful! Please create a profile to continue',
              );
            } else {
              // req.flash('success', 'Login Successful');
              return res.redirect(
                `/employee/dashboard/${data.userTypeId}?success_message=Login Successful`,
              );
            }
          }
          return res.status(422).render('Pages/employee-sign-in', {
            path: '/employee/login',
            pageName: 'Employee Login',
            errorMessage: 'Invalid email or password.',
            success: req.flash('success'),
            isLoggedIn: req.session.isLoggedIn,
            oldInput: {
              email,
              password,
            },
            validationErrors: [],
          });
        })
        .catch(() => res.redirect('/employee/login'));
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEmployerLogin = async (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  let currentUser;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).render('Pages/employer-signin', {
      path: '/employer/login',
      pageName: 'Employer Login',
      errorMessage: errors.array()[0].msg,
      isLoggedIn: req.session.isLoggedIn,
      success: req.flash('success'),
      oldInput: {
        email,
        password,
      },
      validationErrors: errors.array(),
    });
  }

  model.User.findOne({ where: { email, role_id: 'ROL-EMPLOYER' } })
    .then(async (user) => {
      if (!user) {
        return res.status(401).render('Pages/employer-signin', {
          path: '/employer/login',
          pageName: 'Employer Login',
          errorMessage: 'Invalid email or password.',
          isLoggedIn: req.session.isLoggedIn,
          success: req.flash('success'),
          oldInput: {
            email,
            password,
          },
          validationErrors: [],
        });
      }

      let userTypeId = null;
      let verificationStatus = null;

      const employer = await model.Employer.findOne({
        where: { user_id: user.user_id },
      });
      if (employer) {
        userTypeId = employer.employer_id;
        verificationStatus = employer.verification_status;
      }

      if (user.status === '0') {
        return res.status(422).render('Pages/employer-signin', {
          path: '/employer/login',
          pageName: 'Employer Sign In',
          errorMessage: 'User is not verified',
          isLoggedIn: req.session.isLoggedIn,
          success: req.flash('success'),
          oldInput: {
            email,
            password,
          },
          validationErrors: [],
        });
      }

      if (user.block) {
        return res.status(422).render('Pages/employer-signin', {
          path: '/employer/login',
          pageName: 'Employer Login',
          errorMessage: 'User is blocked.',
          isLoggedIn: req.session.isLoggedIn,
          success: req.flash('success'),
          oldInput: {
            email,
            password,
          },
          validationErrors: [],
        });
      }
      currentUser = user;
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (valid) {
            const data = {
              email: currentUser.email,
              userRole: currentUser.role_id,
              userTypeId,
              verificationStatus,
            };
            req.session.data = data;
            req.session.isLoggedIn = true;
            req.session.userId = user.user_id;
            req.session.employerId = data.userTypeId;
            if (!user.employer_id) {
              req.flash('success', 'Login Successful');
              // req.flash('error', 'You need to create a profile before you proceed');
              res.redirect('/employer/profile/create');
            }
            res.redirect(`/employer/dashboard/${user.employer_id}`);
          }
          return res.status(422).render('Pages/employer-signin', {
            path: '/employer/login',
            pageName: 'Employer Login',
            errorMessage: 'Invalid email or password.',
            success,
            isLoggedIn: req.session.isLoggedIn,
            oldInput: {
              email,
              password,
            },
            validationErrors: [],
          });
        })
        .catch(() => {
          res.redirect('/employer/login');
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.userLogin = (req, res, next) => {
//   const { email } = req.body;
//   const { password } = req.body;
//   let currentUser;
//   model.User.findOne({ where: { email } })
//     .then(async (user) => {
//       if (!user) {
//         return errorResMsg(
//           res,
//           404,
//           'Incorrect login details, user does not exist',
//         );
//       }

//       // Getting the user type ID
//       let userTypeId = null;
//       let verificationStatus = null;
//       let isEmployer = false;
//       if (user.role_id === 'ROL-EMPLOYEE') {
//         const employee = await model.Employee.findOne({
//           where: { user_id: user.user_id },
//         });
//         if (employee) {
//           userTypeId = employee.employee_id;
//         }
//       } else if (user.role_id === 'ROL-EMPLOYER') {
//         isEmployer = true;
//         const employer = await model.Employer.findOne({
//           where: { user_id: user.user_id },
//         });
//         if (employer) {
//           userTypeId = employer.employer_id;
//           verificationStatus = employer.verification_status;
//         }
//       }

//       if (user.status === '0') {
//         return errorResMsg(res, 401, 'User is not verified');
//       }

//       if (user.block) {
//         return errorResMsg(res, 401, 'User Blocked!');
//       }

//       currentUser = user;
//       bcrypt.compare(password, user.password).then((valid) => {
//         if (!valid) {
//           return errorResMsg(res, 401, 'Incorrect login details');
//         }

//         let data = {
//           email: currentUser.email,
//           userId: currentUser.user_id.toString(),
//           userRole: currentUser.role_id,
//           userTypeId,
//         };

//         if (isEmployer) data = { ...data, verificationStatus };

//         const token = jsonWT.signJWT(data);

//         sessionSuccessResMsg(
//           res,
//           'login successful',
//           200,
//           token,
//           currentUser.user_id.toString(),
//         );
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }

//       next(err);
//     });
// };

exports.adminLogin = async (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('Pages/admin-login', {
      path: '/admin/login',
      pageName: 'Admin login',
      errorMessage: errors.array()[0].msg,
      isLoggedIn: req.session.isLoggedIn,
      oldInput: {
        email,
        password,
      },
      validationErrors: errors.array(),
    });
  }
  model.User.findOne({ where: { email } })
    .then(async (user) => {
      if (!user) {
        return res.status(422).render('Pages/admin-login', {
          path: '/admin/login',
          pageName: 'Admin Login',
          errorMessage: 'Incorrect login details,user does not exist.',
          isLoggedIn: req.session.isLoggedIn,
          oldInput: {
            email,
            password,
          },
          validationErrors: [],
        });
      }
      if (user.role_id !== 'ROL-ADMIN' && user.role_id !== 'ROL-SUPERADMIN') {
        return res.status(422).render('Pages/admin-login', {
          path: '/admin/login',
          pageName: 'Admin Login',
          errorMessage: 'User is not an admin.',
          isLoggedIn: req.session.isLoggedIn,
          oldInput: {
            email,
            password,
          },
          validationErrors: [],
        });
      }
      let userTypeId = null;

      const admin = await model.Admin.findOne({
        where: { user_id: user.user_id },
      });

      if (admin) {
        userTypeId = admin.admin_id;
        req.session.name = `${admin.firstName} ${admin.lastName}`;
      }

      if (user.status === '0') {
        return res.status(422).render('Pages/admin-login', {
          path: '/admin/login',
          pageName: 'Admin Login',
          errorMessage: 'User is not verified.',
          isLoggedIn: req.session.isLoggedIn,
          oldInput: {
            email,
            password,
          },
          validationErrors: [],
        });
      }
      if (user.block) {
        return res.status(422).render('Pages/admin-login', {
          path: '/admin/login',
          pageName: 'Admin Login',
          errorMessage: 'User is blocked.',
          isLoggedIn: req.session.isLoggedIn,
          oldInput: {
            email,
            password,
          },
          validationErrors: [],
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (valid) {
            const data = {
              email: user.email,
              userRole: user.role_id,
              userTypeId,
            };
            req.session.data = data;
            req.session.isLoggedIn = true;
            req.session.userId = user.user_id;
            req.session.adminId = userTypeId;
            res.redirect('/admin/dashboard?message=Welcome, login successful!');
          }
          return res.status(422).render('Pages/admin-login', {
            path: '/admin/login',
            pageName: 'Admin Login',
            errorMessage: 'Incorrect login details.',
            isLoggedIn: req.session.isLoggedIn,
            oldInput: {
              email,
              password,
            },
            validationErrors: [],
          });
        })
        .catch(() => {
          res.redirect('/admin/login');
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res) => {
  req.session = null;
  res.redirect('/');
};

const getResetPasswordToken = () => {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken, 'utf8')
    .digest('hex');

  // Set expire
  const resetPasswordExpire = Date.now() + 3600000;

  return { resetToken, resetPasswordToken, resetPasswordExpire };
};

// @desc      Forgot password
// @route     POST /v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await model.User.findOne({
    where: { email: req.body.email },
  });

  if (!user) {
    req.flash('error', 'User with this email is not found');
    return res.redirect('/recover/password');
  }

  // Get reset token
  const {
    resetToken,
    resetPasswordToken,
    resetPasswordExpire,
  } = getResetPasswordToken();

  await model.User.update(
    {
      resetPasswordToken,
      resetPasswordExpire,
    },
    {
      where: {
        email: req.body.email,
      },
    },
  );

  // Create reset url
  const resetUrl = `${URL}/password/reset/${resetToken}`;
  const message = `You are receiving this email because a password reset has been requested 
  with your email. Please click this link to proceed: \n\n <a href=${resetUrl}>link</a> or 
  ignore if you are unaware of this action.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    req.flash('success', 'Reset password link has been sent to your mail');
    return res.redirect('/recover/password');
  } catch (err) {
    // eslint-disable-next-line no-console
    user.reset_password_token = null;
    user.reset_password_expire = null;

    await user.save({ validateBeforeSave: false });

    req.flash('error', 'An error occured, please try again!');
    return res.redirect('/recover/password');
  }
});

// @desc      Reset password
// @route     PUT /v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.body.token, 'utf8')
    .digest('hex');

  const user = await model.User.findOne({
    where: {
      reset_password_token: resetPasswordToken,
    },
  });

  if (!user) {
    req.flash('error', 'Invalid token');
    return res.redirect('/recover/password');
  }

  if (user.dataValues.resetPasswordExpire < Date.now()) {
    req.flash('error', 'Reset password token expired,please try again');
    return res.redirect('/recover/password');
  }

  // hash password before saving
  const salt = bcrypt.genSaltSync(10);

  // Set new password
  user.password = bcrypt.hashSync(req.body.password, salt);
  user.reset_password_token = null;
  user.reset_password_expire = null;
  await user.save();

  req.flash('success', 'Password changed successfully');

  if (user.role_id === 'ROL-EMPLOYER') return res.redirect('/employer/login');
  if (user.role_id === 'ROL-EMPLOYEE') return res.redirect('/employee/login');
});

exports.resendVerificationLink = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errResponse = errors.array({ onlyFirstError: true });
    req.flash('error', errResponse[0].msg);
    return res.redirect('/verify-email');
  }
  // check if user exist
  const checkUser = await model.User.findOne({
    where: { email: req.body.email },
  });
  if (!checkUser) {
    // return errorResMsg(res, 403, 'Invalid email');
    req.flash('error', 'Invalid email');
    return res.redirect('/verify-email');
  }

  if (checkUser.status === '1') {
    // return errorResMsg(res, 401, 'This email has been verified');
    req.flash('error', 'This email has been verified');
    return res.redirect('/verify-email');
  }

  const basicInfo = {
    email: checkUser.email,
  };

  // generate new verification_token
  const token = jsonWT.signJWT(basicInfo);
  checkUser.verification_token = token;
  checkUser.save();

  // mail verification code to the user
  const verificationUrl = `${URL}/auth/email/verify?verification_code=${token}`;

  const message = `<p> Hello, you requested for the resend of your verification link. 
        Kindly verify your email </p><a href ='${verificationUrl}'>link</a>`;
  try {
    await sendEmail({
      email: checkUser.email,
      subject: 'Email verification',
      message,
    });
    // const data = { message: 'Verification email re-sent!' };
    // successResMsg(res, 201, data);
    req.flash(
      'success',
      'Please check your email. Verification link has been sent.',
    );
    return res.redirect('/verify-email');
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.render('Pages/verify-email', { PageName: 'Verify Email' });
  }
};

exports.updatePassword = (req, res) => {
  (async () => {
    try {
      // eslint-disable-next-line camelcase
      const { oldPassword, newPassword } = req.body;
      const { userId } = req.params;
      const user = await model.User.findOne({ where: { user_id: userId } });
      if (!user) {
        return errorResMsg(res, 404, 'user does not exist');
      }

      bcrypt.compare(oldPassword, user.password).then(async (valid) => {
        if (!valid) {
          return errorResMsg(res, 401, 'Incorrect Password');
        }

        // hash password before saving
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(newPassword, salt);
        await model.User.update(
          {
            password: hashPassword,
          },
          {
            where: {
              user_id: userId,
            },
          },
        );
        const data = { message: 'Password sucessfully updated' };
        return successResMsg(res, 200, data);
      });
    } catch (err) {
      return errorResMsg(res, 500, 'Password could not be updated!');
    }
  })();
};

exports.superAdminLogin = (req, res, next) => {
  const { email, password } = req.body;
  // const { password } = req.body;
  let currentUser;
  model.User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return errorResMsg(
          res,
          401,
          'Incorrect login details, user does not exist',
        );
      }
      if (user.role_id !== 'ROL-SUPERADMIN') {
        return errorResMsg(res, 401, 'User is not a Super Admin!');
      }
      if (user.status === '0') {
        return errorResMsg(res, 401, 'User is not verified');
      }
      if (user.block) {
        return errorResMsg(res, 401, 'User is blocked!');
      }
      bcrypt.compare(password, user.password).then((pass) => {
        if (!pass) {
          return errorResMsg(res, 401, 'Incorrect login details');
        }
        currentUser = user;
        const data = {
          email: currentUser.email,
          username: currentUser.username,
          userId: currentUser.user_id.toString(),
          userRole: currentUser.role_id,
        };

        const time = '1h';

        const token = jsonWT.signJWT(data, time);
        sessionSuccessResMsg(
          res,
          'login successful',
          200,
          token,
          currentUser.user_id.toString(),
        );
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
