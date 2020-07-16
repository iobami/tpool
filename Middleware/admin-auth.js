const model = require('../Models/index');

module.exports = {

  authorizeAdmin: (req, res, next) => {
    if (req.session.isLoggedIn) {
      return next();
    }
    res.redirect('/admin/login');
  },

  authorizeSuperAdmin: async (req, res, next) => {
    const { userId } = req.session;
    const superAdmin = await model.User.findOne({
      where: {
        user_id: userId,
        role_id: 'ROL-SUPERADMIN',
      },
    });
    if (req.session.isLoggedIn && superAdmin) {
      req.superAdmin = true;
      return next();
    }
    res.redirect('back');
  },
};
