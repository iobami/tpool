const express = require("express");
const appRoute = express.Router();

const { employerSignIn } = require('../../controllers/employer/auth');

appRoute.get('/employer-sign-in', employerSignIn);

module.exports = appRoute;


