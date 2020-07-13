/* eslint-disable no-console */
/* eslint-disable consistent-return */
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const model = require('../Models/index');
const jsonWT = require('../Utils/auth-token');
const { getUserData, createUser } = require('../Utils/helpers/passport-helper');

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
          const data = await getUserData(profile, user, done);
          done(null, data);
        } else {
          // create a new user
          const userData = await createUser(profile, 'ROL-EMPLOYER');

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
          const data = await getUserData(profile, user, done);
          done(null, data);
        } else {
          // create a new user
          const userData = await createUser(profile, 'ROL-EMPLOYEE');

          return done(null, userData);
        }
      } catch (error) {
        console.log(error);
      }
    },
  ));
