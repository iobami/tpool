module.exports = {
 employerProfile : (req, res) => {
    res.render('Pages/employer-profile-page', { pageName: 'Profile'});
  },

  employerCreateProfile: (req, res) => {
    res.render('Pages/employer-profile-creation', { pageName: 'Create Profile'});
  }
}