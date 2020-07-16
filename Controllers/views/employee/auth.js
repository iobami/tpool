/* eslint-disable consistent-return */
module.exports = {
  employeeSignup: (req, res) => {
    let message = req.flash('error');
    if (message.length > 0) {
      [message] = message;
    } else {
      message = null;
    }

    // message end
    const { passport } = req.session;

    if (req.session && !passport) {
      const { isLoggedIn, employeeId } = req.session;

      if (isLoggedIn && employeeId) {
        res.redirect(`/employee/dashboard/${req.session.employeeId}`);
      } else if (isLoggedIn && !employeeId) {
        return res.redirect(
          '/employee/create/profile?success_message=Please create a profile to continue',
        );
      }
    }

    if (passport) {
      const { isLoggedIn, passport: { user } } = req.session;
      const { userTypeId } = user;
      if (isLoggedIn && userTypeId) {
        res.redirect(`/employee/dashboard/${userTypeId}`);
      } else if (isLoggedIn && !userTypeId) {
        return res.redirect(
          '/employee/create/profile?success_message=Please create a profile to continue',
        );
      }
      return res.render('Pages/employee-sign-up', {
        path: '/employee/register',
        pageName: 'Employee Signup',
        error: req.flash('error'),
        errors: req.flash('errors'),
        success: req.flash('success'),
        errorMessage: message,
        oldInput: {
          email: '',
          password: '',
        },
        validationErrors: [],
      });
    }

    return res.render('Pages/employee-sign-up', {
      path: '/employee/register',
      pageName: 'Employee Signup',
      isLoggedIn: '',
      error: req.flash('error'),
      errors: req.flash('errors'),
      success: req.flash('success'),
      errorMessage: message,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  },

  employeeSignIn: (req, res) => {
    // display messages
    const success = req.flash('success');
    let message = req.flash('error');
    if (message.length > 0) {
      [message] = message;
    } else {
      message = null;
    }

    // message end
    const { passport } = req.session;

    if (req.session && !passport) {
      const { isLoggedIn, employeeId } = req.session;

      if (isLoggedIn && employeeId) {
        res.redirect(`/employee/dashboard/${req.session.employeeId}`);
      } else if (isLoggedIn && !employeeId) {
        return res.redirect(
          '/employee/create/profile?success_message=Please create a profile to continue',
        );
      }
    }

    if (passport) {
      const { isLoggedIn, passport: { user } } = req.session;
      const { userTypeId } = user;
      if (isLoggedIn && userTypeId) {
        res.redirect(`/employee/dashboard/${userTypeId}`);
      } else if (isLoggedIn && !userTypeId) {
        return res.redirect(
          '/employee/create/profile?success_message=Please create a profile to continue',
        );
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
    }

    return res.render('Pages/employee-sign-in', {
      path: '/employee/login',
      pageName: 'Employee Login',
      success,
      isLoggedIn: '',
      errorMessage: message,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  },
};
