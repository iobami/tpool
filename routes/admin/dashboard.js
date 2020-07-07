const express = require("express");
const appRoute = express.Router();

const { faq, employerMessages, messages } = require('../../controllers/admin/dashboard');

appRoute.get('/faq', faq);
appRoute.get('/employer-messages', employerMessages);
appRoute.get('/admin-messages', messages);
module.exports = appRoute;