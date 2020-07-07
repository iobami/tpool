const express = require("express");
const appRoute = express.Router();

const { faq, employerMessages } = require('../../controllers/admin/dashboard');

appRoute.get('/faq', faq);
appRoute.get('/employer-messages', employerMessages);

module.exports = appRoute;