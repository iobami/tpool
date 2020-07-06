const express = require("express");

const appRoute = express.Router();
const employeeSignup = require('../controllers/employee-signup');

appRoute.get('/', (req, res) => {
  res.render('index', { variable: 'Hello Guys' });
});

appRoute.get('/employee-sign-up', employeeSignup.employeeSignup );

module.exports = appRoute;