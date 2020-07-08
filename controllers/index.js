module.exports = {

  home: (req, res) => {
    res.render('index', { pageName: 'Home' });
  },

  about: (req, res) => {
    res.render('Pages/aboutUs', { pageName: 'About' });
  },

  directory: (req, res) => {
    res.render('Pages/directory', { pageName: 'Directory' });
  },

  faq: (req, res) => {
    res.render('Pages/faq', { pageName: 'FAQ' });
  },

  contactUs: (req, res) => {
    res.render('Pages/contactUs', { pageName: 'Contact Us' });
  },
  signOutPopUp: (req, res) => {
    res.render('Pages/signOutPopUp', { pageName: 'Sign Out' });
  },
  comingSoon: (req, res) => {
    res.render('Pages/coming-soon', { pageName: 'Coming Soon' });
  }
}
