const express = require("express");
const appRoute = express.Router();

const { employerSignIn } = require('../../controllers/employer/auth');
const { employerSignup } = require('../../controllers/employer/auth');

appRoute.get('/employer-sign-in', employerSignIn);
appRoute.get('/employer-sign-up', employerSignup);

module.exports = appRoute;


