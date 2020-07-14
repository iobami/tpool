module.exports = {

  employerSignup: (req, res) => {
    res.render('Pages/employer-sign-up', {
      pageName: 'Employer Registration',
      error: req.flash('error'),
      errors: req.flash('errors'),
      success: req.flash('success'),
    });
  },

  employerSignIn: (req, res) => {
    if (req.session.isLoggedIn) {
      res.redirect('/employee/dashboard');
    }

    let message = req.flash('error');
    if (message.length > 0) {
      [message] = message;
    } else {
      message = null;
    }
    res.render('Pages/employer-signin', {
      path: '/employer/login',
      pageName: 'Employer Login',
      errorMessage: message,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  },
};
