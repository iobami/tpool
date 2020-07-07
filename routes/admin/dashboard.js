const express = require("express");
const appRoute = express.Router();

const { faq, employerMessages, messages, allEmployers } = require('../../controllers/admin/dashboard');

appRoute.get('/admin-faq', faq);
appRoute.get('/admin-employer-messages', employerMessages);
appRoute.get('/admin-messages', messages);
appRoute.get('/admin-all-employers', allEmployers);
module.exports = appRoute;