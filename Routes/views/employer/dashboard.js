const express = require('express');
const appRoute = express.Router();
const {
  employerMessages,
  employerCreateProfile,
  employerDashboardSettings,
  employerDashboardSupport,
  employerEmployeeGallery,
  employerAddTeam,
  employerCompanyDashboard,
  employerCertificate,
  uploaddocsuccess,
  uploaddocfailure,
} = require('../../../Controllers/views/employer/dashboard');
const componenreuse = require('../../../controllers/employer/employer-controller'); //set by kukere
const { authemployer } = require('../../../Middleware/employerAuth');
appRoute.get('/employer/dashboard', authemployer, employerCompanyDashboard); //set by kukere

appRoute.get('/employer/profile', (req, res) => {
  req.session.userId = 'd8bd7c2c-6722-406d-a30c-1cac4ac09b6a';
  componenreuse.getemployerdetails(
    req,
    res,
    'Profile',
    'Pages/employer-profile-page',
  );
}); //there will be middleware
appRoute.get('/employer/dasboard/success', authemployer, uploaddocsuccess);
appRoute.get('/employer/dashboard/failure', authemployer, uploaddocfailure);
appRoute.get('/employer/messages', authemployer, employerMessages); //there will be middleware
appRoute.get('/employer/profile/create', authemployer, employerCreateProfile); //there will be a middleware
appRoute.get('/employer/dashboard/settings', employerDashboardSettings);
appRoute.get('/employer/dashboard/support', employerDashboardSupport);
appRoute.get(
  '/employer/employees/gallery',
  authemployer,
  employerEmployeeGallery,
);
appRoute.get('/employer/add-team', authemployer, employerAddTeam);
appRoute.get('/employer/certificate', authemployer, employerCertificate);

module.exports = appRoute;
