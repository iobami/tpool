const express = require("express");
const appRoute = express.Router();

const { passwordOTP } = require('../../controllers/password/password');

appRoute.get('/password-otp', passwordOTP);

module.exports = appRoute;


