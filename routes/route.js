const express = require("express");
const employeeController = require('../controllers/employeeController');
const appRoute = express.Router();

appRoute.get('/', (req, res) => {
  res.render('index', { variable: 'Hello Guys' });
});

appRoute.get('/employee-dashboard', employeeController.getEmployeeDash);
appRoute.get('/employee-messages', employeeController.getEmployeeMessages);
appRoute.get('/employee-profile', employeeController.getEmployeeProfile);
appRoute.get('/employee-addTeam', employeeController.getEmployeeAddTeam);
appRoute.get('/employee-support', employeeController.getEmployeeSupport);
appRoute.get('/employee-settings', employeeController.getEmployeeSettings);
appRoute.get('/employee-employees', employeeController.getEmployeeEmployees);
appRoute.get('/employee-profileCreation', employeeController.getEmployeeProfileCreation);
module.exports = appRoute;


