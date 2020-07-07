const express = require("express");
const appRoute = express.Router();

const { adminSignUp } = require('../../controllers/admin/auth');

appRoute.get('/admin-signup', adminSignUp)

module.exports = appRoute;