const express = require('express');
const appRoute = express.Router();
const { authorizeAdmin, authorizeSuperAdmin } = require('../../../Middleware/admin-auth');
const {
  faq,
  employerMessages,
  messages,
  allEmployers,
  dashboard,
  adminVerification,
  adminSettings,
  adminEmployee,
  allEmployees,
  employeeReview,
  adminsList,
  managePackages,
} = require('../../../Controllers/views/admin/dashboard');

appRoute.get('/admin/faq', authorizeAdmin, faq);
appRoute.get('/admin/employer/messages', authorizeAdmin, employerMessages);
appRoute.get('/admin/messages', authorizeAdmin, messages);
appRoute.get('/admin/all/employers', authorizeAdmin, allEmployers);
appRoute.get('/admin/dashboard', authorizeAdmin, dashboard);
appRoute.get('/admin/verification', authorizeAdmin, adminVerification);
appRoute.get('/admin/settings', authorizeAdmin, adminSettings);
appRoute.get('/admin/all/employees', authorizeAdmin, allEmployees);
appRoute.get('/employee/review', authorizeAdmin, employeeReview);
appRoute.get('/admin/viewEmployee', authorizeAdmin, adminEmployee);
appRoute.get('/admin/lists', authorizeSuperAdmin, adminsList);
appRoute.get('/admin/manage-packages', managePackages);

module.exports = appRoute;
