module.exports = {
  employeeSignIn: (req, res) => {
    res.render('Pages/employee-sign-in', { pageName: 'Employee Sign In' });
  },

  employeeSignup: (req, res) => {
    res.render('Pages/employee-sign-up', {
      pageName: 'Employee Signup', error: req.flash('error'), errors: req.flash('errors'), success: req.flash('success'),
    });
  },
};
