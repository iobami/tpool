const express = require("express");

const appRoute = express.Router();
const employeeSignup = require('../controllers/employee-signup');

appRoute.get('/', (req, res) => {
  res.render('index', { pageName: 'Home' });
});

appRoute.get('/employee-sign-up', employeeSignup.employeeSignup );

module.exports = appRoute;