/* eslint-disable consistent-return */
module.exports = {
  employeeSignup: (req, res) => {
    const loggedIn = req.session.isLoggedIn;

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
      const {
        isLoggedIn,
        passport: { user },
      } = req.session;
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
        isLoggedIn: loggedIn,
        error: req.flash('error'),
        errors: req.flash('errors'),
        success: req.flash('success'),
        oldInput: req.flash('oldInput'),
      });
    }
    // const { isLoggedIn } = req.session;
    return res.render('Pages/employee-sign-up', {
      path: '/employee/register',
      pageName: 'Employee Signup',
      isLoggedIn: loggedIn,
      error: req.flash('error'),
      errors: req.flash('errors'),
      success: req.flash('success'),
      oldInput: req.flash('oldInput'),
    });
  },

  employeeSignIn: (req, res) => {
    const loggedIn = req.session.isLoggedIn;
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
      const {
        isLoggedIn,
        passport: { user },
      } = req.session;
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

    // const { isLoggedIn } = req.session;
    return res.render('Pages/employee-sign-in', {
      path: '/employee/login',
      pageName: 'Employee Login',
      success,
      isLoggedIn: loggedIn,
      errorMessage: message,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  },
};
