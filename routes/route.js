const express = require("express");
const { employeeSignIn, employeeSignup } = require('../controllers/employee/auth');
const { employerSignIn } = require('../controllers/employer/auth')
const { about } = require('../controllers/about')

//import signup controller
const { employerSignup } = require('../controllers/employer/auth');


const appRoute = express.Router();

appRoute.get('/', (req, res) => {
  res.render('index', { pageName: 'Home' });
});

appRoute.get('/employer-sign-up', employerSignup);
appRoute.get('/employer-sign-in', employerSignIn)
appRoute.get('/employee-sign-in', employeeSignIn);
appRoute.get('/employee-sign-up', employeeSignup);
appRoute.get('/aboutUs', about);

module.exports = appRoute;