/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { uuid } = require('uuidv4');
const bcrypt = require('bcryptjs');
const jsonWT = require('../auth-token');
const model = require('../../Models');

exports.getUserData = async (req, profile, user, done) => {
  try {
    let userTypeId = null;
    let verificationStatus = null;
    let isEmployer = false;
    if (user.role_id === 'ROL-EMPLOYEE') {
      const employee = await model.Employee.findOne({ where: { user_id: user.user_id } });
      if (employee) {
        userTypeId = employee.employee_id;
      }
    } else if (user.role_id === 'ROL-EMPLOYER') {
      isEmployer = true;
      const employer = await model.Employer.findOne({ where: { user_id: user.user_id } });
      if (employer) {
        userTypeId = employer.employer_id;
        verificationStatus = employer.verification_status;
      }
    }

    if (user.status === '0') {
      return done(null, false, req.flash('error', 'User is not verified'));
    }

    if (user.block) {
      return done(null, false, req.flash('error', 'User is blocked, please contact an Admin'));
    }
    let data = {
      email: user.email,
      userId: user.user_id.toString(),
      userRole: user.role_id,
      userTypeId,
    };

    if (isEmployer) data = { ...data, verificationStatus };

    return data;
  } catch (error) {
    console.log(error);
  }
};

exports.createUser = async (profile, userRole) => {
  try {
    const password = process.env.TALENT_POOL_JWT_SECRET;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = {
      email: profile.emails[0].value,
    };
    const token = jsonWT.signJWT(data);

    const userSave = {
      email: profile.emails[0].value,
      password: hashedPassword,
      verification_token: token,
      role_id: userRole,
      user_id: uuid(),
      status: '1',
      picture_url: profile.photos[0].value,
      provider: profile.provider,
    };
    const userData = await model.User.create(userSave);
    return userData;
  } catch (error) {
    console.log(error);
  }
};
