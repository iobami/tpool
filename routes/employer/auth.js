const express = require('express');
const { auth } = require('../../Middleware/auth');
const appRoute = express.Router();

const { employerSignIn } = require('../../controllers/employer/auth');
const { employerSignup } = require('../../controllers/employer/auth');
const { verification } = require('../../controllers/employer/auth');

appRoute.get('/employer-verification', auth, verification);
appRoute.get('/employer-sign-in', employerSignIn);
appRoute.get('/employer-sign-up', employerSignup);

module.exports = appRoute;
