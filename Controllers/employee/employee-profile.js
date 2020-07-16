/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable comma-dangle */

const { uuid } = require('uuidv4');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// eslint-disable-next-line operator-linebreak
const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.TALENT_POOL_DEV_URL
    : process.env.TALENT_POOL_FRONT_END_URL;

// eslint-disable-next-line no-unused-vars
const upload = multer({ dest: `${__dirname}../../public/employeeimages` });

const models = require('../../Models');

const { successResMsg, errorResMsg } = require('../../Utils/response');

const attributes = [
  'id',
  'first_name',
  'last_name',
  'username',
  'location',
  'track',
  'phone_no',
  'image',
  'gender',
  'hng_id',
  'availability',
  'dob',
  'employee_cv',
  'views',
  'employee_id',
  'user_id',
  'referredBy',
  'hasTeam',
  'user_type',
  'verification_status',
];

let image;

const uploadImageFunction = async (req, res) => {
  try {
    await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      (error, result) => {
        if (result) {
          image = result.secure_url;
          return image;
        }
        return res.redirect(
          '/employee/create/profile?error_message=Image Upload Failed, Kindly retry',
        );
      },
    );
    return image;
  } catch (err) {
    req.flash('error', err.message);
    return errorResMsg(res, 500, err.message);
  }
};

// CREATE A PROFILE -- Consumed directly.
exports.createProfile = async (req, res) => {
  try {
    const employeeId = uuid();
    const imageUrl = await uploadImageFunction(req, res);
    const { userId } = req.session;
    const {
      firstName,
      lastName,
      userType,
      hngId,
      userName,
      location,
      track,
      phoneNo,
      availability,
      dateOfBirth,
      employeeCv,
    } = req.body;
    const newBody = {
      first_name: firstName,
      last_name: lastName,
      user_type: userType,
      phone_no: phoneNo,
      hng_id: hngId,
      username: userName,
      image: imageUrl,
      location,
      track,
      availability,
      dob: dateOfBirth,
      employee_id: employeeId,
      views: '0',
      employee_cv: employeeCv,
      user_id: userId,
    };

    // eslint-disable-next-line camelcase
    // const { user_id: } = req.session;
    const userQuery = await models.User.findOne({ where: { user_id: userId } });
    if (!userQuery) {
      // return errorResMsg(res, 400, 'Invalid user id');
      req.flash('error', 'Invalid user id');
      return res.redirect('/employee/create/profile');
    }

    // Check if user has a PROFILE
    const query = await models.Employee.findOne({ where: { user_id: userId } });

    const userProfile = await query;
    // Check if profile does not already exist
    if (userProfile) {
      req.flash(
        'error',
        'User already has a profile. Please, update existing profile',
      );
      return res.redirect(
        `/employee/dashboard/${employeeId}?success_message=User already has a profile. Please, update existing profile`,
      );
    }
    // Create new profile
    await models.Employee.create(newBody);

    req.flash('success', 'Profile Created Succesfully!');
    req.session.isProfileCreated = true;
    req.session.profileId = employeeId;
    return res.redirect(
      `/employee/dashboard/${employeeId}?success_message=Profile created successfully`,
    );
  } catch (err) {
    req.flash('error', err.message);
  }
};

// GET AN EMPLOYEE DASHBOARD DATA -- Renders a page
exports.getDashboard = async (req, res) => {
  try {
    const { success_message } = req.query;
    let employeeId;
    const { isLoggedIn, userTypeId } = req.session;

    if (req.params.employee_id) {
      employeeId = req.params.employee_id;
    } else if (isLoggedIn && userTypeId) {
      employeeId = req.session.employeeId;
    }

    const errorMessage = req.query.error_status;

    const query = await models.Employee.findOne({
      where: { employee_id: employeeId },
      attributes,
    });

    const skillQuery = await models.Skill.findAll({
      where: { employee_id: employeeId },
    });

    const portfolioQuery = await models.Portfolio.findAll({
      where: { employee_id: employeeId },
    });

    const teamQuery = await models.Team.findOne({
      where: { employee_id: employeeId },
    });

    const employee = await query;
    const skills = await skillQuery;
    const portfolios = await portfolioQuery;

    const team = await teamQuery;

    // Set employee data to session
    req.session.firstName = employee.username;

    if (team) {
      const { employer_id, Team_name, status } = team;
      const employerQuery = await models.Employer.findOne({
        where: { employer_id },
      });

      const {
        employer_name,
        employer_phone,
        employer_email,
        employer_country,
        employer_photo,
        website,
        facebook,
        twitter,
        instagram,
        linkedin,
      } = await employerQuery;

      const data = {
        employee,
        skills,
        portfolios,
        team: {
          name: Team_name,
          status,
          employer: {
            name: employer_name,
            phone: employer_phone,
            email: employer_email,
            country: employer_country,
            photo: employer_photo,
            website,
            social: {
              facebook,
              twitter,
              instagram,
              linkedin,
            },
          },
        },
      };

      // if (!employee) {
      //   req.flash('error', 'Profile not found');
      // }
      return res.status(200).render('Pages/employee-dashboard', {
        pageTitle: 'Talent Pool | Dashboard',
        success: success_message,
        dashboardPath: `${URL}employee/dashboard/${employeeId}`,
        profilePath: `${URL}employee/profile/${employeeId}`,
        portfolioPath: `${URL}employee/portfolio/${employeeId}`,
        path: '',
        errorMessage,
        data,
      });
    }

    const data = {
      employee,
      skills,
      portfolios,
      team,
    };

    req.session.flash.error = null;
    req.session.flash.success = null;

    return res.status(200).render('Pages/employee-dashboard', {
      pageTitle: 'Talent Pool | Dashboard',
      success: success_message,
      dashboardPath: `${URL}employee/dashboard/${employeeId}`,
      profilePath: `${URL}employee/profile/${employeeId}`,
      portfolioPath: `${URL}employee/portfolio/${employeeId}`,
      path: '',
      errorMessage,
      data,
    });
  } catch (err) {
    return errorResMsg(res, 500, err.message);
  }
};

// GET AN EMPLOYEE PROFILE -- Renders a page
exports.getProfile = async (req, res) => {
  try {
    const { passport: { user } } = req.session;
    const { userTypeId } = user;

    let employeeId;
    employeeId = req.session.userTypeId || userTypeId;

    if (req.params.employee_id) {
      employeeId = req.params.employee_id;
    } else if (userTypeId) {
      employeeId = req.session.employeeId;
    }

    const query = await models.Employee.findOne({
      where: { employee_id: employeeId },
      attributes,
    });

    const profile = await query;

    const data = { ...profile.dataValues, email: req.session.email };

    return res.status(200).render('Pages/employeeProfile', {
      pageTitle: 'Talent Pool | Profile',
      dashboardPath: `${URL}employee/dashboard/${employeeId}`,
      profilePath: `${URL}employee/profile/${employeeId}`,
      portfolioPath: `${URL}employee/portfolio/${employeeId}`,
      path: '',
      data,
    });
  } catch (err) {
    req.flash('error', 'Something went wrong. Try again');
    return errorResMsg(res, 500, err.message);
  }
};

// GET AEMPLOAYEE PORTFOLIOS -- Renders a page
exports.getPortfolio = async (req, res) => {
  try {
    const { passport: { user } } = req.session;
    const { userTypeId } = user;

    let employeeId;
    employeeId = req.session.employeeId || userTypeId;

    if (req.params.employee_id) {
      employeeId = req.params.employee_id;
    }

    const query = await models.Portfolio.findAll({
      where: { employee_id: employeeId },
    });

    const data = await query;

    return res.status(200).render('Pages/employee-portfolio', {
      pageTitle: `Talent Pool | ${
        req.session.firstName ? req.session.firstName : ''
      }'s Portfolio`,
      dashboardPath: `${URL}employee/dashboard/${employeeId}`,
      profilePath: `${URL}employee/profile/${employeeId}`,
      portfolioPath: `${URL}employee/portfolio/${employeeId}`,
      path: '',
      data,
    });
  } catch (err) {
    req.flash('error', 'Something went wrong. Try again');
  }
};

exports.createPortfolio = async (req, res) => {
  try {
    const { passport: { user } } = req.session;
    const { userTypeId } = user;

    const employeeId = req.session.employeeId || userTypeId;

    // CREATE A NEW PORTFOLIO
    await models.Portfolio.create({
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      employee_id: employeeId,
    });

    return res.redirect(
      `/employee/portfolio/${employeeId}?success_message=Portfolio created successfully`,
    );
  } catch (err) {
    req.flash('error', 'Something went wrong. Try again');
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const { passport: { user } } = req.session;
    const { userTypeId } = user;

    const employeeId = req.session.userTypeId || userTypeId;
    let id;
    await models.Portfolio.destroy({
      where: {
        id,
        employee_id: employeeId,
      },
      force: true,
    });

    return res.redirect(
      `/employee/portfolio/${employeeId}?success_message=Portfolio deleted successfully`,
    );
  } catch (err) {
    req.flash('error', 'Something went wrong. Try again');
  }
};

// GET AN EMPLOYEE PROFILE BY USERNAME -- Directory (ALL ACCESS) -- // TODO  Render on a page
// eslint-disable-next-line consistent-return
exports.getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const query = await models.Employee.findOne({
      where: { username },
      attributes,
    });

    // eslint-disable-next-line camelcase
    const { employee_id } = await query;

    const skillQuery = await models.Skill.findAll({
      where: { employee_id },
    });

    const portfolioQuery = await models.Portfolio.findAll({
      where: { employee_id },
    });

    const employee = await query;
    const skills = await skillQuery;
    const portfolios = await portfolioQuery;

    const data = { employee, skills, portfolios };

    if (!employee) {
      req.flash('error', 'Profile not found');
      res.redirect('back');
    }

    return res.status(200).render('no page yet', {
      // TODO create a page for get profile by username
      pageTitle: `Talent Pool | ${username}'s Profile`,
      path: `/${username}`,
      data,
    });
  } catch (err) {
    return errorResMsg(res, 500, err.message);
  }
};

// UPDATE AN EMPLOYEE PROFILE -- To be consumed with axios
// eslint-disable-next-line consistent-return
exports.updateProfile = async (req, res) => {
  try {
    if (!(req.body.employee_id || req.body.user_id)) {
      const { employee_id: employeeId } = req.params;
      // Update Profile
      let reqBody = req.body;
      if (req.files) {
        const imageUrl = await uploadImageFunction(req, res);
        reqBody = { image: imageUrl, ...req.body };
      }

      await models.Employee.update(reqBody, {
        where: { employee_id: employeeId },
        plain: true,
      });

      // Get updated profile for return
      const updatedProfile = await models.Employee.findOne({
        where: { employee_id: employeeId },
        attributes,
      });

      const data = await updatedProfile;

      // Profile not found??
      if (!data) {
        return errorResMsg(res, 404, 'Profile not found');
      }
      // return updated data
      return successResMsg(res, 200, data);
    }
    return errorResMsg(
      res,
      400,
      'Bad Request! Please, try again with accepted entries!!!',
    );
  } catch (err) {
    return errorResMsg(res, 500, err.message);
  }
};
// DELETE AN EMPLOYEE PROFILE -- To be consumed with axios
// eslint-disable-next-line consistent-return
exports.deleteProfile = async (req, res) => {
  try {
    const { employee_id: employeeId } = req.params;
    const doc = await models.Employee.destroy({
      where: { employee_id: employeeId },
      force: true,
    });

    // Profile not found??
    if (!doc) {
      return errorResMsg(res, 404, 'Profile not found');
    }
    // Return response 204 [No Content]
    const message = 'profile deteted';
    return successResMsg(res, 200, { message });
  } catch (err) {
    return errorResMsg(res, 500, err.message);
  }
};
