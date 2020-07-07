const express = require("express");
const appRoute = express.Router();

const { about, home, faq } = require('../controllers');

appRoute.get('/', home);
appRoute.get('/aboutUs', about);
appRoute.get('/faq', faq);

module.exports = appRoute;