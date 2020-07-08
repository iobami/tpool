module.exports = {
  employerDashboard: (req, res) => {
      res.render('Pages/employer-dashboard', { pageName: 'Employer Dashboard' });
  },

  employerProfile : (req, res) => {
      res.render('Pages/employer-profile-page', { pageName: 'Profile'});
    },

  employerCreateProfile: (req, res) => {
    res.render('Pages/employer-profile-creation', { pageName: 'Create Profile'});
  },

  employerDashboardSettings: (req, res) => {
    res.render('Pages/employer-dash-settings.ejs', { pageName: 'Employer Dashboard - Settings' });
  },

  employerDashboardSupport: (req, res) => {
    res.render('Pages/employer-dash-support', { pageName: 'Employer Dashboard' });
  },

  employerEmployeeGallery: (req, res) => {
    res.render('Pages/employer-employees-gallery', { pageName: 'Employee Gallery' });
  },

  employerAddTeam: (req, res) => {
    res.render('Pages/employer-add-a-team', { pageName: 'Employer - Add Team' });
  },

  employerCompanyDashboard: (req, res) => {
    res.render('Pages/employer-company-dashboard', { pageName: 'Employer Dashboard' });
  },

  employerIndividualCreateProfile: (req, res) => {
    res.render('Pages/employer-indiv', { pageName: 'Create Profile' });
  },
}