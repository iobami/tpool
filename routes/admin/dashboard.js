const express = require("express");
const appRoute = express.Router();

const { faq, employerMessages, messages, allEmployers, dashboard, adminVerification } = require('../../controllers/admin/dashboard');

appRoute.get('/admin-faq', faq);
appRoute.get('/admin-employer-messages', employerMessages);
appRoute.get('/admin-messages', messages);
appRoute.get('/admin-all-employers', allEmployers);
appRoute.get('/admin-dashboard', dashboard);
appRoute.get('/admin-verification', adminVerification)

module.exports = appRoute;