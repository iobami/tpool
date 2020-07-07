module.exports = {
  employerSignIn : (req, res) => {
    res.render('employer-signin', {pageName: 'Employer Login'})
  },

  employerSignup: (req, res) => {
    res.render('employer-sign-up', {
      pageName: 'Employer Signup'
  });
  }
};
