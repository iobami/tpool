module.exports = {
  // employeeSignIn: (req, res) => {
  //   res.render('Pages/employee-sign-in', { pageName: 'Employee Sign In' });
  // },

  employeeSignup: (req, res) => {
    res.render('Pages/employee-sign-up', { pageName: 'Sign Up' });
  },

  employeeSignIn: (req, res) => {
    if (req.session.isLoggedIn) {
      res.redirect('/employee/dashboard');
    }

    let message = req.flash('error');
    if (message.length > 0) {
      [message] = message;
    } else {
      message = null;
    }
    res.render('Pages/employee-sign-in', {
      path: '/employee-sign-in',
      pageName: 'Employee Sign In',
      errorMessage: message,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  },
};
