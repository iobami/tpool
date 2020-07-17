const model = require('../Models/index');

module.exports = {

  authorizeAdmin: async (req, res, next) => {
    if (!req.session.userId) {
      return res.redirect('/admin/login');
    }
    const { userId } = req.session;
    const Admin = await model.User.findOne({
      where: {
        user_id: userId,
        role_id: ['ROL-ADMIN', 'ROL-SUPERADMIN'],
      },
    });
    if (req.session.isLoggedIn && Admin) {
      return next();
    }
    res.redirect('/admin/login');
  },

  authorizeSuperAdmin: async (req, res, next) => {
    if (!req.session.userId) {
      return res.redirect('/admin/login');
    }
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
