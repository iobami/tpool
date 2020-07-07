const express = require("express");
const { employeeSignIn, employeeSignup } = require('../controllers/employee/auth');
const { employerSignIn } = require('../controllers/employer/auth')
const { about } = require('../controllers/about')

//import signup controller
const { getEmployerSignup } = require('../controllers/employer-signup');


const appRoute = express.Router();

appRoute.get('/', (req, res) => {
  res.render('index', { pageName: 'Home' });
});

appRoute.get('/employer-sign-up', getEmployerSignup);
appRoute.get('/employer-sign-in', employerSignIn)
appRoute.get('/employee-sign-in', employeeSignIn);
appRoute.get('/employee-sign-up', employeeSignup);
appRoute.get('/aboutUs', about);

module.exports = appRoute;