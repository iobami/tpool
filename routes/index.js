const express = require('express');
const appRoute = express.Router();
// const {}
const {
  about,
  home,
  directory,
  faq,
  contactUs,
  signOutPopUp,
  comingSoon,
} = require('../controllers');
const { logout } = require('../controllers/logout');

appRoute.get('/', home);
appRoute.get('/about-us', about);
appRoute.get('/contact-us', contactUs);
appRoute.get('/directory', directory);
appRoute.get('/faq', faq);
appRoute.get('/signOutPopUp', signOutPopUp);
appRoute.get('/coming-soon', comingSoon);
appRoute.get('/logout', logout);

module.exports = appRoute;
