const express = require("express");
const appRoute = express.Router();

const { faq, employerMessages, adminVerification } = require('../../controllers/admin/dashboard');

appRoute.get('/faq', faq);
appRoute.get('/employer-messages', employerMessages);
appRoute.get('/admin-verification', adminVerification)

module.exports = appRoute;