const router = require('express').Router();
const passport = require('passport');
// const { errorResMsg, successResMsg } = require('../Utils/response');

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.json('Unauthorized');
  }
};

// user sent to dashboard on successfull auth
router.get('/auth/dashboard', (req, res) => {
  res.json(req.user);
});

// get profile details from google
router.get('/auth/employer/google',
  passport.authenticate('google-employer', { scope: ['profile', 'email'] }));

// get profile details from google
router.get('/auth/employee/google',
  passport.authenticate('google-employee', { scope: ['profile', 'email'] }));

router.get('/auth/employer/google/callback',
  passport.authenticate('google-employer', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication,
    res.redirect('/auth/dashboard');
  });

router.get('/auth/employee/google/callback',
  passport.authenticate('google-employee', { failureRedirect: '/' }),
  (req, res) => {
  // Successful authentication,
    res.redirect('/auth/dashboard');
  });

// github routes
// router.get('/github',
//   passport.authenticate('github'));

// router.get('/github/callback',
//   passport.authenticate('github', { failureRedirect: '/v1/auth/failed' }),
//   (req, res) => {
//     // Successful authentication,
//     res.redirect('/v1/auth/dashboard');
//   });

// linkedin routes

// router.get('/linkedin',
//   passport.authenticate('linkedin'));

// router.get('/linkedin/callback', passport.authenticate('linkedin', {
//   successRedirect: '/v1/auth/dashboard',
//   failureRedirect: '/v1/auth/failed',
// }));

module.exports = router;
