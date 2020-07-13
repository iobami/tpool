const { uuid } = require('uuidv4');
const model = require('../../Models');

const getUserData = async (profile, user, done) => {
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
      return done(null, false);
    }

    if (user.block) {
      return done(null, false);
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


const createUser = async (accessToken, profile) => {
  // save the profile id in a variable
  const value = `${profile.id}`;
  const data = {
    user_id: uuid(),
    gender: 'male',
    first_name: profile.displayName,
    last_name: profile.displayName,
    username: profile.username,
    email: profile.emails[0].value,
    password: '12345678',
    picture_url: profile.photos[0].value,
    provider: profile.provider,
    verification_token: accessToken,
  };

  let dataToCreate;
  // check provider to know how to populate the povider id field
  if (profile.provider === 'google') {
    dataToCreate = { ...data, googleId: value };
  } else if (profile.provider === 'github') {
    dataToCreate = { ...data, githubId: value };
  } else {
    dataToCreate = { ...data, linkedinId: value };
  }

  // create user with created object
  const newUser = await models.User.create(dataToCreate);
  return newUser;
};
module.exports = createUser;
