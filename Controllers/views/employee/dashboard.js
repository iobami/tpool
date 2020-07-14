/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
// const employeeController = require('../../employee/employee-profile');
exports.getEmployeeMessages = (req, res) => {
  res.render('Pages/employee-messages', {
    pageTitle: 'Talent Pool | Messages',
    path: '/employee/messages',
  });
};
exports.getEmployeeProfile = (req, res) => {
  res.render('Pages/employeeProfile', {
    pageTitle: 'Talent Pool | Profile',
    path: '/employee/profile',
  });
};
exports.getEmployeePortfolio = (req, res) => {
  res.render('Pages/employee-portfolio', {
    pageTitle: 'Talent Pool | Portfolio',
    path: '/employee/portfolio',
  });
};

exports.getEmployeeSupport = (req, res) => {
  res.render('Pages/employee-support', {
    pageTitle: 'Talent Pool | Support',
    path: '/employee/support',
  });
};
exports.getEmployeeSettings = (req, res) => {
  res.render('Pages/employee-settings', {
    pageTitle: 'Talent Pool | Settings',
    path: '/employee/settings',
  });
};
exports.getEmployeeEmployers = (req, res) => {
  res.render('Pages/employee-employer', {
    pageTitle: 'Talent Pool | Employers',
    path: '/employee/employers',
  });
};
exports.getEmployeeProfileCreation = (req, res) => {
  const { isLoggedIn, employeeId, isProfileCreated, profileId } = req.session;

  if (isLoggedIn && employeeId) {
    res.redirect(`/employee/dashboard/${req.session.employeeId}`);
  } else if (profileId && isProfileCreated) {
    res.redirect(`/employee/dashboard/${req.session.profileId}`);
  } else {
    return res.render('Pages/employee-profile-creation', {
      pageTitle: 'TalentPool | Create Profile',
      path: '/employee/profile/create',
    });
  }
};
