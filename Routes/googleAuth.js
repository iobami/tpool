/* eslint-disable consistent-return */
const router = require('express').Router();
const passport = require('passport');

// <----------------------- GOOOGLE ROUTE AND CONTOLLERS ------------------------------>
// get employer profile details from google
router.get(
  '/auth/employer/google',
  passport.authenticate('google-employer', { scope: ['profile', 'email'] }),
);

// get employee profile details from google
router.get(
  '/auth/employee/google',
  passport.authenticate('google-employee', { scope: ['profile', 'email'] }),
);

// receive process details from passport.setup
router.get(
  '/auth/employer/google/callback',
  passport.authenticate('google-employer', {
    failureRedirect: '/employer/login',
    failureFlash: true,
  }),
  async (req, res) => {
    try {
      // Successful authentication,
      const { user } = req;
      if (!user.userTypeId || user.userTypeId == null) {
        req.session.isLoggedIn = false;
        req.session.userId = user.user_id;
        req.flash('success', 'Authentication successful!');
        return res.redirect('/employer-create-profile');
      }
      req.session.isLoggedIn = true;
      req.session.userId = user.user_id;
      req.flash('success', 'Login successful!');
      return res.redirect('/employer-dashboard');
    } catch (error) {
      res.redirect('/employer-sign-in');
    }
  },
);

// receive process details from passport.setup
router.get(
  '/auth/employee/google/callback',
  passport.authenticate('google-employee', {
    failureRedirect: '/employee/login',
    failureFlash: true,
  }),
  async (req, res) => {
    try {
      // Successful authentication,
      const { user } = req;
      req.session.isLoggedIn = true;
      // req.session.data = user.email;
      req.session.email = user.email;
      req.session.userId = user.user_id;
      if (!user.userTypeId || user.userTypeId == null) {
        req.flash('success', 'Authentication successful!');
        return res.redirect(
          '/employee/create/profile?success_message=Authentication successful!',
        );
      }
      req.flash('success', 'Login successful!');
      return res.redirect(
        `/employee/dashboard/${user.userTypeId}?success_message=Login Successful`,
      );
    } catch (error) {
      res.redirect('/employee/login');
    }
  },
);
// <===================== END GOOGLE ===================>

// ------------------------- GITHUB ROUTES AND CONTROLLERS ---------------------->
// get employer profile details from github
router.get('/auth/employer/github', passport.authenticate('github-employer'));

// receive process details from passport.setup
router.get(
  '/auth/github/callback',
  passport.authenticate('github-employer', {
    failureRedirect: '/employer/login',
    failureFlash: true,
  }),
  (req, res) => {
    try {
      const { user } = req;
      if (user.userRole === 'ROL-EMPLOYER') {
        if (!user.userTypeId || user.userTypeId == null) {
          req.session.isLoggedIn = false;
          req.session.userId = user.user_id;
          req.flash('success', 'Authentication successful!');
          return res.redirect('/employer-create-profile');
        }
        req.session.isLoggedIn = true;
        req.session.userId = user.user_id;
        req.flash('success', 'Login successful!');
        return res.redirect('/employer-dashboard');
      }
      if (!user.userTypeId || user.userTypeId == null) {
        req.session.isLoggedIn = false;
        req.session.userId = user.user_id;
        req.flash('success', 'Authentication successful!');
        return res.redirect(
          '/employee/create/profile?success_message=Authentication successful!',
        );
      }
      req.session.isLoggedIn = true;
      req.session.userId = user.user_id;
      req.flash('success', 'Login successful!');
      return res.redirect(
        `/employee/dashboard/${user.userTypeId}?success_message=Login Successful`,
      );
    } catch (error) {
      res.redirect('/employer-sign-in');
    }
  },
);

// get employee profile details from github
router.get('/auth/employee/github', passport.authenticate('github-employee'));

// receive process details from passport.setup
router.get(
  '/auth/github/callback',
  passport.authenticate('github-employee', {
    failureRedirect: '/employee/login',
    failureFlash: true,
  }),
  (req, res) => {
    try {
      const { user } = req;
      if (user.userRole === 'ROL-EMPLOYER') {
        if (!user.userTypeId || user.userTypeId == null) {
          req.session.isLoggedIn = false;
          req.session.userId = user.user_id;
          req.flash('success', 'Authentication successful!');
          return res.redirect('/employer-create-profile');
        }
        req.session.isLoggedIn = true;
        req.session.userId = user.user_id;
        req.flash('success', 'Login successful!');
        return res.redirect('/employer-dashboard');
      }

      req.session.isLoggedIn = true;
      // req.session.data = user.email;
      req.session.email = user.email;
      req.session.userId = user.user_id;

      if (!user.userTypeId || user.userTypeId == null) {
        req.flash('success', 'Authentication successful!');
        return res.redirect(
          '/employee/create/profile?success_message=Authentication successful!',
        );
      }
      req.flash('success', 'Login successful!');
      return res.redirect(
        `/employee/dashboard/${user.userTypeId}?success_message=Login Successful`,
      );
    } catch (error) {
      res.redirect('/employee/login');
    }
  },
);

// <======================== END GITHUB =========================>
module.exports = router;
