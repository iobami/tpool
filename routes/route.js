const express = require("express");
const { employeeSignIn } = require('../controllers/auth');
const { about } = require('../controllers/about')

const appRoute = express.Router();
const { employeeSignup }  = require('../controllers/employee-signup');

appRoute.get('/', (req, res) => {
  res.render('index', { pageName: 'Home' });
});

appRoute.get('/employee-sign-in', employeeSignIn);
appRoute.get('/employee-sign-up', employeeSignup );
appRoute.get('/aboutUs', about);

module.exports = appRoute;