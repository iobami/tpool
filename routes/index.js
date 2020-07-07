const express = require("express");
const appRoute = express.Router();

const { about, home, directory, faq, contactUs } = require('../controllers');

appRoute.get('/', home);
appRoute.get('/aboutUs', about);
appRoute.get('/contactUs', contactUs);
appRoute.get('/directory', directory);
appRoute.get('/faq', faq);

module.exports = appRoute;