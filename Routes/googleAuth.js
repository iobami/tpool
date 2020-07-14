const router = require('express').Router();
const passport = require('passport');

// user sent to dashboard on successfull auth
router.get('/auth/dashboard', (req, res) => {
  res.json(req.user);
});

// get employer profile details from google
router.get('/auth/employer/google',
  passport.authenticate('google-employer', { scope: ['profile', 'email'] }));

// get employee profile details from google
router.get('/auth/employee/google',
  passport.authenticate('google-employee', { scope: ['profile', 'email'] }));

// receive process details from passport.setup
router.get('/auth/employer/google/callback',
  passport.authenticate('google-employer', { failureRedirect: '/employer/login' }),
  (req, res) => {
    // Successful authentication,
    const { user } = req;
    if ((!user.userTypeId) || user.userTypeId == null) {
      req.session.isLoggedIn = false;
      req.session.userId = user.user_id;
      return res.redirect('/employer/create/profile');
    }
    req.session.isLoggedIn = true;
    req.session.userId = user.user_id;
    return res.redirect('/employer/dashboard');
  });

// receive process details from passport.setup
router.get('/auth/employee/google/callback',
  passport.authenticate('google-employee', { failureRedirect: '/employee/login' }),
  (req, res) => {
  // Successful authentication,
    const { user } = req;
    if ((!user.userTypeId) || user.userTypeId == null) {
      req.session.isLoggedIn = false;
      req.session.userId = user.user_id;
      return res.redirect('/employee/profile/create');
    }
    req.session.isLoggedIn = true;
    req.session.userId = user.user_id;
    return res.redirect('/employee/dashboard/:employee_id');
  });

module.exports = router;
