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
  passport.authenticate('google-employer', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication,
    res.redirect('/auth/dashboard');
  });

// receive process details from passport.setup
router.get('/auth/employee/google/callback',
  passport.authenticate('google-employee', { failureRedirect: '/' }),
  (req, res) => {
  // Successful authentication,
    res.redirect('/auth/dashboard');
  });

module.exports = router;
