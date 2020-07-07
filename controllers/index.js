module.exports = {

  home: (req, res) => {
    res.render('index', { pageName: 'Home' });
  },
  
  about: (req, res) => {
      res.render('Pages/aboutUs', { pageName: 'About' });
    },
}
