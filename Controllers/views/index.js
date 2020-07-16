module.exports = {
  home: (req, res) => {
    const {
      isLoggedIn, employeeId, employerId, adminId,
    } = req.session;

    // if (!isLoggedIn) {

    // }
    if (isLoggedIn && employeeId) {
      res.redirect(`/employee/dashboard/${req.session.employeeId}`);
    } else if (isLoggedIn && !employeeId && employerId && adminId) {
      return res.redirect(
        '/employee/create/profile?success_message=Please create a profile to continue',
      );
    }
    if (isLoggedIn && employerId) {
      res.redirect(`/employer/dashboard/${employerId}`);
    } else if (isLoggedIn && employeeId && !employerId && adminId) {
      return res.redirect('/employer/profile/create');
    }
    if (isLoggedIn && adminId) {
      res.redirect('/admin/dashboard/');
    } else if (!isLoggedIn) {
      return res.render('index', { pageName: 'Home', isLoggedIn: req.session.isLoggedIn });
    }
  },
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
};
