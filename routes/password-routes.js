const express = require("express");
const appRoute = express.Router();

const { recoverPassword } = require('../controllers/password-controller');

appRoute.get('/recover-password', recoverPassword);

module.exports = appRoute;
