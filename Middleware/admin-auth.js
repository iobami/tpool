module.exports = {

  authorizeAdmin: (req, res, next) => {
    if (req.session.isLoggedIn) {
      console.log(req.session.isLoggedIn);
      return next();
    }
    res.redirect('/admin/login');
  },
};
