const express = require("express");
const appRoute = express.Router();

const { about, home, directory } = require('../controllers');

appRoute.get('/', home);
appRoute.get('/aboutUs', about);
appRoute.get('/directory', directory);

module.exports = appRoute;