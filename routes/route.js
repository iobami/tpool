const express = require("express");
const { employeeSignIn } = require('../controllers/auth');

const appRoute = express.Router();
const { employeeSignup }  = require('../controllers/employee-signup');
const { employerProfile } = require('../controllers/employer-profile');
const { employerProfileCreation } = require('../controllers/auth');

appRoute.get('/', (req, res) => {
  res.render('index', { pageName: 'Home' });
});

appRoute.get('/employee-sign-in', employeeSignIn);
appRoute.get('/employee-sign-up', employeeSignup );

appRoute.get('/employer-profile', employerProfile);
appRoute.get('/employer-create-profile', employerProfileCreation);

module.exports = appRoute;