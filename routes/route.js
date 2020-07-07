const express = require("express");
const { employeeSignIn, employeeSignup} = require('../controllers/employee/auth');
const { employerSignIn } = require('../controllers/employer/auth')
const { about } = require('../controllers/about')

const appRoute = express.Router();

appRoute.get('/', (req, res) => {
  res.render('index', { pageName: 'Home' });
});


appRoute.get('/employer-sign-in', employerSignIn)
appRoute.get('/employee-sign-in', employeeSignIn);
appRoute.get('/aboutUs', about);
appRoute.get('/employer-dashboard', (req, res) => {
  res.render('employer-dashboard', { pageName: 'Employer Dashboard' });
})

module.exports = appRoute;