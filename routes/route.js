const express = require("express");
const { employeeSignIn, employeeSignup} = require('../controllers/employee/auth');
const { about } = require('../controllers/about')

const appRoute = express.Router();

appRoute.get('/', (req, res) => {
  res.render('index', { pageName: 'Home' });
});

appRoute.get('/employee-sign-in', employeeSignIn);
appRoute.get('/employee-sign-up', employeeSignup );
appRoute.get('/aboutUs', about);

module.exports = appRoute;