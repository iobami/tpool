module.exports = {
  faq: (req, res) => {
    res.render('Pages/admin-dash-faq', { pageName: 'Faq' });
  },

  employerMessages: (req, res) => {
    res.render('Pages/admin-dash-employer-msg', { pageName: 'Messages for employer' });
  },

   messages: (req, res) => {
     res.render('Pages/admin-dash-messages', { pageName: 'Admin dashboard messages'});
   },


   allEmployers: (req, res) => {
    res.render('Pages/admin-dash-employers', { pageName: 'Admin | All Employers'})
   },

   allEmployees: (req, res) => {
    res.render('Pages/view-employee-dashboard', { pageName: 'View Employee' });
   },
  
   dashboard: (req, res) => {
    res.render('Pages/admin-dashboard', { pageName: 'Admin dashboard',path: "admin-dashboard"});
  },

  adminVerification: (req, res) => {
    res.render('Pages/admin-verification', {pageName: 'Admin Verification'})
  },

  employeeReview: (req, res) => {
    res.render('Pages/employee-review', { pageName: 'Employee Review'} )
  },

  adminSettings: (req, res) => {
    res.render('Pages/admin-settings', {pageName: 'Admin Settings',path: "admin-settings"})
  }
}
