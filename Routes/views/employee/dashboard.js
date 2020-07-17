const express = require('express');
const employeeViewController = require('../../../Controllers/views/employee/dashboard');
const employeeController = require('../../../Controllers/employee/employee-profile');

const appRoute = express.Router();
// Dashboard Route
appRoute.get(
  '/employee/dashboard/:employee_id',
  employeeController.getDashboard,
);
// Portfolio Page
appRoute.get(
  '/employee/portfolio/:employee_id',
  employeeController.getPortfolio,
);
// Create Portfolio

appRoute.post('/employee/create/portfolio', employeeController.createPortfolio);

// delete Portfolio
appRoute.delete(
  '/employee/delete/portfolio',
  employeeController.deletePortfolio,
);

// Create Skill
appRoute.post('/employee/create/skill', employeeController.createSkill);

// Profile Page
appRoute.get('/employee/profile/:employee_id', employeeController.getProfile);
// Get Employee Messages
appRoute.get('/employee/messages', employeeViewController.getEmployeeMessages);

// Create Profile
appRoute.get(
  '/employee/create/profile',
  employeeViewController.getEmployeeProfileCreation,
);
appRoute.post('/employee/profile/create', employeeController.createProfile);

// Update Profile
appRoute.patch('/employee/update/profile', employeeController.updateProfile);
// Get Profile By Username -- No Page, use AXIOS then render data
appRoute.get('/:username', employeeController.getProfileByUsername);
// Employee Support
// appRoute.get('/employee/support', employeeViewController.getEmployeeSupport);
// // Employee Settings
// appRoute.get('/employee/settings', employeeViewController.getEmployeeSettings);
// Employee's Employers
// appRoute.get(
//   '/employee/employers',
//   employeeViewController.getEmployeeEmployers,
// );

module.exports = appRoute;
