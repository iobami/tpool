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
router.get('/dashboard', isLoggedIn, (req, res) => {
  const data = req.user;
  return res.json(data);
});

// get profile details from google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication,
    res.redirect('/v1/auth/dashboard');
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
