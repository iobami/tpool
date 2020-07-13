module.exports = {
  employerSignIn: (req, res) => {
    res.render('Pages/employer-signin', { pageName: 'Employer Login' });
  },

  employerSignup: (req, res) => {
    res.render('Pages/employer-sign-up', {
      pageName: 'Employer Signup', error: req.flash('error'), errors: req.flash('errors'), success: req.flash('success'),
    });
  },
};
