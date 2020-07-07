const express = require("express");
const appRoute = express.Router();

const { faq, employerMessages, messages, dashboard, adminVerification } = require('../../controllers/admin/dashboard');

appRoute.get('/faq', faq);
appRoute.get('/employer-messages', employerMessages);
appRoute.get('/admin-messages', messages);
appRoute.get('/admin-dashboard', dashboard);
appRoute.get('/admin-verification', adminVerification)


module.exports = appRoute;