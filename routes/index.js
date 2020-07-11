const express = require('express');
const appRoute = express.Router();
// const {}
const {
  about,
  home,
  faq,
  contactUs,
  signOutPopUp,
  comingSoon,
  verify,
} = require('../controllers');
const { logout } = require('../controllers/logout');
const { directory } = require('../controllers/directory');

appRoute.get('/', home);
appRoute.get('/about-us', about);
appRoute.get('/contact-us', contactUs);
appRoute.get('/directory', directory);
appRoute.get('/faq', faq);
appRoute.get('/signOutPopUp', signOutPopUp);
appRoute.get('/coming-soon', comingSoon);
appRoute.get('/verify-email', verify);
appRoute.get('/logout', logout);

module.exports = appRoute;
