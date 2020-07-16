module.exports = {
  employerSignup: (req, res) => {
    const {
      isLoggedIn, employerId,
    } = req.session;

    if (isLoggedIn && employerId) {
      res.redirect(`/employer/dashboard/${req.session.employerId}`);
    } else if (isLoggedIn && !employerId) {
      return res.redirect('/employer/profile/create');
    }

    return res.render('Pages/employer-sign-up', {
      pageName: 'Employer Registration',
      oldInput: req.flash('oldInput'),
      error: req.flash('error'),
      isLoggedIn,
      errors: req.flash('errors'),
      success: req.flash('success'),
    });
  },

  employerSignIn: (req, res) => {
    const {
      isLoggedIn, employerId,
    } = req.session;

    if (isLoggedIn && employerId) {
      res.redirect(`/employer/dashboard/${employerId}`);
    } else if (isLoggedIn && !employerId) {
      return res.redirect('/employer/profile/create');
    }
    const success = req.flash('success');
    let message = req.flash('error');
    if (message.length > 0) {
      [message] = message;
    } else {
      message = null;
    }
    res.render('Pages/employer-signin', {
      path: '/employer/login',
      pageName: 'Employer Login',
      isLoggedIn,
      errorMessage: message,
      success,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  },
};
