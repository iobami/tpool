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
//const componenreuse = require('../../../controllers/employer/employer-controller'); //set by kukere
const {
  auth_main,
  auth_validuser,
  auth_valid_profile,
  auth_pending,
  auth_uploaded,
  auth_disapproved,
  auth_approved,
} = require('../../../Middleware/employerAuth');
//employer dashboard
appRoute.get(
  '/employer/dashboard',
  auth_main,
  auth_validuser,
  auth_valid_profile,
  auth_pending,
  auth_uploaded,
  auth_disapproved,
  //the main dashboard
  employerCompanyDashboard,
); //set by kukere

<<<<<<< HEAD
appRoute.get('/employer/profile', (req, res) => {
  req.session.userId = 'd8bd7c2c-6722-406d-a30c-1cac4ac09b6a';
  return res.redirect('/employer/login');
}); //there will be middlewarerlfkgfkh
appRoute.get(
  '/employer/dasboard/success',
  auth_main,
  auth_validuser,
  auth_valid_profile,
  auth_pending,
  auth_disapproved,
  auth_approved,
  //the main controller
  uploaddocsuccess,
);
appRoute.get(
  '/employer/dashboard/failure',
  auth_main,
  auth_validuser,
  auth_valid_profile,
  auth_pending,
  auth_uploaded,
  auth_approved,
  //the main controller
  uploaddocfailure,
);
appRoute.get(
  '/employer/messages',
  auth_main,
  auth_validuser,
  auth_valid_profile,
  auth_pending,
  auth_uploaded,
  auth_disapproved,
  //the main controller
  employerMessages,
);
appRoute.get(
  '/employer/profile/create',
  auth_main,
  auth_validuser,
  auth_pending,
  auth_uploaded,
  auth_disapproved,
  auth_approved,
  //the main contoller
  employerCreateProfile,
); //there will be a middleware
appRoute.get(
  '/employer/dashboard/settings',
  auth_main,
  auth_validuser,
  auth_valid_profile,
  //the main controller
  employerDashboardSettings,
);
appRoute.get(
  '/employer/dashboard/support',
  auth_main,
  auth_validuser,
  auth_valid_profile,
  //the main controller
  employerDashboardSupport,
);
appRoute.get(
  '/employer/employees/gallery',
  auth_main,
  auth_validuser,
  auth_valid_profile,
  auth_pending,
  auth_uploaded,
  auth_disapproved,
  //the main controller
  employerEmployeeGallery,
);
appRoute.get(
  '/employer/add-team',
  auth_main,
  auth_validuser,
  auth_valid_profile,
  auth_pending,
  auth_uploaded,
  //the main controller
  employerAddTeam,
);
appRoute.get(
  '/employer/certificate',
  auth_main,
  auth_validuser,
  auth_valid_profile,
  auth_uploaded,
  auth_disapproved,
  auth_approved,
  //the main controller
  employerCertificate,
);
=======
appRoute.get('/employer/dashboard', employerDashboard);
appRoute.get('/employer/profile', employerProfile);
appRoute.get('/employer/messages', employerMessages);
appRoute.get('/employer/create/profile', employerCreateProfile);
appRoute.get('/employer/type', employerType);
appRoute.get('/employer/company', employerCompany);
appRoute.get('/employer/individual', employerIndividual);
appRoute.get('/employer/dashboard/settings', employerDashboardSettings);
appRoute.get('/employer/dashboard/support', employerDashboardSupport);
appRoute.get('/employer/employees/gallery', employerEmployeeGallery);
appRoute.get('/employer/add/team', employerAddTeam);
appRoute.get('/employer/company/dashboard', employerCompanyDashboard);
appRoute.get(
  '/employer/individual/create/profile',
  employerIndividualCreateProfile,
);
appRoute.get('/employer/certificate', employerCertificate);
>>>>>>> cd21d93397e8f81d51ac7ecd418a266177ab4246

module.exports = appRoute;
