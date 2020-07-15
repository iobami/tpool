/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
// const employeeController = require('../../employee/employee-profile');
exports.getEmployeeMessages = (req, res) => {
  res.render('Pages/employee-messages', {
    pageTitle: 'Talent Pool | Messages',
    path: '/employee/messages',
  });
};
exports.getEmployeePortfolio = (req, res) => {
  const { employeeId } = req.session;
  res.render('Pages/employee-portfolio', {
    pageTitle: 'Talent Pool | Portfolio',
    dashboardPath: `${URL}employee/dashboard/${employeeId}`,
    profilePath: `${URL}employee/profile/${employeeId}`,
    portfolioPath: `${URL}employee/portfolio/${employeeId}`,
    path: '',
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
      success: req.query.success_message,
      errorMessage: req.query.error_message,
      pageTitle: 'TalentPool | Create Profile',
      path: '/employee/profile/create',
    });
  }
};
