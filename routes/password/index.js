const express = require("express");
const appRoute = express.Router();

const { passwordOTP, passwordReset } = require('../../controllers/password/password');

appRoute.get('/password-otp', passwordOTP);
appRoute.get('/password-reset', passwordReset)

module.exports = appRoute;


