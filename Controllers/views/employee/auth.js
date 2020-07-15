/* eslint-disable consistent-return */
module.exports = {
  employeeSignup: (req, res) => {
    const { isLoggedIn, employeeId } = req.session;

    if (isLoggedIn && employeeId) {
      res.redirect(`/employee/dashboard/${req.session.employeeId}`);
    } else if (isLoggedIn && !employeeId) {
      return res.redirect('/employee/profile/create');
    }

    return res.render('Pages/employee-sign-up', {
      path: '/employee/register',
      pageName: 'Employee Signup',
      error: req.flash('error'),
      errors: req.flash('errors'),
      success: req.flash('success'),
    });
  },

  employeeSignIn: (req, res) => {
    const { isLoggedIn, employeeId } = req.session;

    if (isLoggedIn && employeeId) {
      res.redirect(`/employee/dashboard/${req.session.employeeId}`);
    } else if (isLoggedIn && !employeeId) {
      return res.redirect(
        '/employee/create/profile?success_message=Please create a profile to continue',
      );
    }
    const success = req.flash('success');
    let message = req.flash('error');
    if (message.length > 0) {
      [message] = message;
    } else {
      message = null;
    }
    return res.render('Pages/employee-sign-in', {
      path: '/employee/login',
      pageName: 'Employee Login',
      success,
      errorMessage: message,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  },
};
