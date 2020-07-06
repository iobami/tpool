const express = require("express");
const { employeeSignIn } = require('../controllers/auth');

const appRoute = express.Router();

appRoute.get('/', (req, res) => {
  res.render('index', { pageName: 'Home' });
});

appRoute.get('/employee-sign-in', employeeSignIn);

module.exports = appRoute;