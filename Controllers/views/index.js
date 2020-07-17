const model = require('../../Models/index');

module.exports = {
  home: (req, res) => res.render('index', { pageName: 'Home', isLoggedIn: req.session.isLoggedIn }),
  about: (req, res) => {
    res.render('Pages/aboutUs', { pageName: 'About', isLoggedIn: req.session.isLoggedIn });
  },

  faq: (req, res) => {
    res.render('Pages/faq', { pageName: 'FAQ', isLoggedIn: req.session.isLoggedIn });
  },

  contactUs: (req, res) => {
    res.render('Pages/contactUs', { pageName: 'Contact Us', isLoggedIn: req.session.isLoggedIn });
  },
  signOutPopUp: (req, res) => {
    res.render('Pages/signOutPopUp', { pageName: 'Sign Out', isLoggedIn: req.session.isLoggedIn });
  },
  comingSoon: (req, res) => {
    res.render('Pages/coming-soon', { pageName: 'Coming Soon', isLoggedIn: req.session.isLoggedIn });
  },
  verify: (req, res) => {
    res.render('Pages/verify-email', {
      pageName: 'Verify Email', error: req.flash('error'), errors: req.flash('errors'), success: req.flash('success'), isLoggedIn: req.session.isLoggedIn,
    });
  },
  returnToDashboard: async (req, res) => {
    const {
      isLoggedIn, userId, data,
    } = req.session;

    if (data.userRole === 'ROL-EMPLOYER') {
      const employer = await model.Employer.findOne({
        where: { user_id: userId },

      });
      if (isLoggedIn && employer) {
        return res.redirect(`/employer/dashboard/${employer.employer_id}`);
      }
      if (isLoggedIn && !employer) {
        return res.redirect('/employer/profile/create');
      }
    }

    if (data.userRole === 'ROL-EMPLOYEE') {
      const employee = await model.Employee.findOne({
        where: { user_id: userId },

      });
      if (isLoggedIn && employee) {
        return res.redirect(`/employee/dashboard/${employee.employee_id}`);
      }
      if (isLoggedIn && !employee) {
        return res.redirect('/employee/create/profile');
      }
    }

    return res.redirect('/admin/dashboard');
  },
};
