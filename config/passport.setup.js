/* eslint-disable no-console */
/* eslint-disable consistent-return */
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const model = require('../Models/index');
const jsonWT = require('../Utils/auth-token');

// serialize user object and send as a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// deserialize user object
passport.deserializeUser(async (id, done) => {
  try {
    done(null, id);
  } catch (error) {
    console.log(error);
  }
});

// employer auth
passport.use('google-employer',
  new GoogleStrategy(
    {
      clientID: process.env.TALENT_POOL_GOOGLE_CLIENTID,
      clientSecret: process.env.TALENT_POOL_GOOGLE_CLIENTSECRET,
      callbackURL: process.env.TALENT_POOL_GOOGLE_EMPLOYER_CALLBACKURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check user in our db
        const checkUser = await model.User.findOne({
          where: {
            email: profile.emails[0].value,
          },
        });
        const user = await checkUser;
        if (user) {
          // user exists, send user object for serialization
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

          done(null, data);
        } else {
          // create a new user
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
            role_id: 'ROL-EMPLOYER',
            user_id: uuid(),
            status: '1',
            picture_url: profile.photos[0].value,
            provider: profile.provider,
          };
          const userData = await model.User.create(userSave);

          return done(null, userData);
        }
      } catch (error) {
        console.log(error);
      }
    },
  ));

// employee authentication
passport.use('google-employee',
  new GoogleStrategy(
    {
      clientID: process.env.TALENT_POOL_GOOGLE_CLIENTID,
      clientSecret: process.env.TALENT_POOL_GOOGLE_CLIENTSECRET,
      callbackURL: process.env.TALENT_POOL_GOOGLE_EMPLOYEE_CALLBACKURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check user in our db
        const checkUser = await model.User.findOne({
          where: {
            email: profile.emails[0].value,
          },
        });
        const user = await checkUser;
        if (user) {
          // user exists, send user object for serialization
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

          done(null, data);
        } else {
          // create a new user
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
            role_id: 'ROL-EMPLOYEE',
            user_id: uuid(),
            status: '1',
            picture_url: profile.photos[0].value,
            provider: profile.provider,
          };
          const userData = await model.User.create(userSave);

          return done(null, userData);
        }
      } catch (error) {
        console.log(error);
      }
    },
  ));
