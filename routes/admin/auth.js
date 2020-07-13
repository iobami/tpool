const express = require("express");
const appRoute = express.Router();

const { adminSignUp, adminLogin } = require('../../controllers/admin/auth');

appRoute.get('/admin-signup', adminSignUp);
appRoute.get('/admin-login', adminLogin);

module.exports = appRoute;