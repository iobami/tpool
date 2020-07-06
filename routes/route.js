const express = require("express");
const { employeeLogin, recoverPassword } = require('../controllers/auth');

const appRoute = express.Router();

appRoute.get('/', (req, res) => {
  res.render('index', { title: 'Talent Pool' });
});

appRoute.get('/employee-sign-in', employeeLogin);
appRoute.get('/recover-password', recoverPassword);

module.exports = appRoute;