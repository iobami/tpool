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
  employerProfile,
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
  auth_firstLogin,
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

appRoute.get(
  '/employer/profile',
  auth_main,
  auth_validuser,
  auth_valid_profile,
  //the main controller
  employerProfile,
);

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
  auth_firstLogin,
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
  //the main controllerclear
  employerCertificate,
);

module.exports = appRoute;
