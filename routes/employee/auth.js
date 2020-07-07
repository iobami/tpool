const express = require("express");
const appRoute = express.Router();

const { employeeSignIn, employeeSignup } = require('../../controllers/employee/auth');

appRoute.get('/employee-sign-in', employeeSignIn);
appRoute.get('/employee-sign-up', employeeSignup );

module.exports = appRoute;
