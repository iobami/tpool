module.exports = {
  employerSignIn : (req, res) => {
    res.render('employer-signin', {pageName: 'Employer Login'})
  },

  employerSignup: (req, res) => {
    console.log("i enter signup")
    res.render('Pages/employer-sign-up', {
      pageName: 'Employer Signup'
  });
  }
};
