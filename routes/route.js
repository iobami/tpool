const express = require("express");
const { employeeSignIn } = require('../controllers/auth');

const appRoute = express.Router();

appRoute.get('/', (req, res) => {
  res.render('index', { pageName: 'Home' });
});

appRoute.get('/employee-sign-in', employeeSignIn);
appRoute.get('/employer-dashboard', (req, res) => {
  res.render('employer-dashboard', { pageName: 'Employer Dashboard' });
})

module.exports = appRoute;