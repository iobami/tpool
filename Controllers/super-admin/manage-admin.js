/* eslint-disable comma-dangle */
const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4');
const model = require('../../Models/index');
const sendEmail = require('../../Utils/sendEmail');
const jsonWT = require('../../Utils/auth-token');
const { successResMsg, errorResMsg } = require('../../Utils/response');

// Dev_tools
const URL = process.env.NODE_ENV === 'development'
  ? process.env.TALENT_POOL_DEV_URL
  : process.env.TALENT_POOL_FRONT_END_URL;

module.exports = {
  addAdminUser: (req, res) => {
    (async () => {
      const {
        first_name: firstName, last_name: lastName, phone_number: phoneNumber, email, password,
      } = req.body;
      const userExists = await model.User.findOne({ where: { email } });
      if (userExists !== null) {
        req.flash('error', 'Email already exist');
        return res.redirect('back');
      }
      const userData = {
        email,
      };
      const token = jsonWT.signJWT(userData);
      // hash password
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);
      const userId = uuid();
      const adminUser = {
        email,
        status: '1',
        password: hashPassword,
        verification_token: token,
        user_id: userId,
        role_id: 'ROL-ADMIN'
      };
      const admin = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        user_id: userId,
      };
      // create user if not exist
      const user = await model.User.create(adminUser);
      const createdAdmin = await model.Admin.create(admin);

      // send login details to admin
      const link = `${URL}/admin/login`;
      const options = {
        email,
        subject: 'New Staff Account Created',
        message: `<h5>Login Credentials<h5>
                  <p>Email: ${email}<p>
                  <p>Password: ${password}<p>
                  Click <a href=${link}>here</a> to login`,
      };

      try {
        await sendEmail(options);
        req.flash('success', 'Verification email sent!');
        return res.redirect('back');
      } catch (err) {
        req.flash('error', 'An Error occoured');
        return res.redirect('back');
      }
    })();
  },

  deleteAdminUser: (req, res) => {
    (async () => {
      const { id } = req.params;
      const userAdminRecord = await model.Admin.findOne({ where: { user_id: id } });

      if (userAdminRecord === null) {
        return errorResMsg(res, 404, 'Admin does not exist');
      }

      const done = await userAdminRecord.destroy({ force: true });

      if (!done) {
        return errorResMsg(res, 500, `Could not delete admin with user id:  ${id}`);
      }

      const userAdmin = await model.User.destroy({ where: { user_id: id }, force: true });
      if (!userAdmin) {
        return errorResMsg(res, 500, `Could not delete Admin ${id}`);
      }

      return successResMsg(res, 200, `Admin with id: ${id}, deleted successfully`);
    })();
  },

  blockAdminUser: (req, res) => {
    (async () => {
      const { id } = req.params;
      const user = await model.User.findOne({ where: { user_id: id } });

      if (user === null) {
        req.flash('Admin does not exist');
        return res.redirect('back');
      }

      // block user
      user.block = 1;
      await user.save();
      req.flash('Admin blocked successfully');
      return res.redirect('back');
    })();
  },

  unBlockAdminUser: (req, res) => {
    (async () => {
      const { id } = req.params;
      const user = await model.User.findOne({ where: { user_id: id } });

      if (user === null) {
        return errorResMsg(res, 404, `Admin with a user id: ${id}, does not exist`);
      }

      // unblock user
      user.block = 0;
      await user.save();
      return successResMsg(res, 200, `Admin with id: ${id}, unblocked successfully`);
    })();
  },

  getAllAdminUsers: (req, res) => {
    (async () => {
      const users = await model.User.findAll({
        where: {
          role_id: 'ROL-ADMIN',
        },
        include: [model.Admin],
      });

      return successResMsg(res, 200, users);
    })();
  },

  getAdminUser: (req, res) => {
    (async () => {
      const { id } = req.params;
      const users = await model.User.findOne({
        where: {
          role_id: 'ROL-ADMIN',
          user_id: id,
        },
        include: [model.Admin],
      });

      return successResMsg(res, 200, users);
    })();
  },
};
