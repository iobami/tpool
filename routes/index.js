const express = require("express");
const appRoute = express.Router();

const { about, home } = require('../controllers');

appRoute.get('/', home);
appRoute.get('/aboutUs', about);

module.exports = appRoute;