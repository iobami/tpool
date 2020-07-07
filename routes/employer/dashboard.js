const express = require("express");
const appRoute = express.Router();

const {
    employerProfile,
    employerCreateProfile,
    employeeDashboardSettings,
} = require('../../controllers/employer/dashboard');

appRoute.get('/employer-profile', employerProfile);
appRoute.get('/employer-create-profile', employerCreateProfile);
appRoute.get('/employer-dashboard-settings', employeeDashboardSettings);

module.exports = appRoute;