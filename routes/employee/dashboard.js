const express = require("express");
const appRoute = express.Router();
const { employerDashboard } = require('../../controllers/employer/dashboard');

appRoute.get('/employer-dashboard', employerDashboard);
module.exports = appRoute;