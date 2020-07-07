const express = require("express");
const appRoute = express.Router();

const { about, home, directory, faq } = require('../controllers');

appRoute.get('/', home);
appRoute.get('/aboutUs', about);
appRoute.get('/directory', directory);
appRoute.get('/faq', faq);

module.exports = appRoute;