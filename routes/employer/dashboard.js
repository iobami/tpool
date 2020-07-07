const express = require("express");
const appRoute = express.Router();

const { employerProfile, employerCreateProfile } = require('../../controllers/employer/dashboard');

appRoute.get('/employer-profile', employerProfile);
appRoute.get('/employer-create-profile', employerCreateProfile);

module.exports = appRoute;