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

// CREATE A PROFILE -- renders.
exports.createProfile = async (req, res) => {
  try {
    let userId;
    const {
      passport
    } = req.session;
    // console.log({ passport });

    if (passport) {
      const { passport: { user } } = req.session;
      userId = user.userId || user.user_id;
      // console.log(userId);
    } else {
      userId = req.session.userId;
    }

    const employeeId = uuid();
    const imageUrl = await uploadImageFunction(req, res);

    req.session.profileImage = imageUrl;

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
      // eslint-disable-next-line no-undef

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
    let profileImage;
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
      profileImage = req.session.profileImage || employee.image;
      req.seesion.profileImage = employee.image;
      return res.status(200).render('Pages/employee-dashboard', {
        pageTitle: 'Talent Pool | Dashboard',
        success: success_message,
        dashboardPath: `${URL}/employee/dashboard/${employeeId}`,
        profilePath: `${URL}/employee/profile/${employeeId}`,
        portfolioPath: `${URL}/employee/portfolio/${employeeId}`,
        messagePath: `${URL}/employee/message/${employeeId}`,
        path: '/employee/message',
        errorMessage,
        data,
        profileImage,
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
    profileImage = req.session.profileImage || employee.image;
    req.session.profileImage = employee.image;

    return res.status(200).render('Pages/employee-dashboard', {
      pageTitle: 'Talent Pool | Dashboard',
      success: success_message,
      dashboardPath: `${URL}/employee/dashboard/${employeeId}`,
      profilePath: `${URL}/employee/profile/${employeeId}`,
      portfolioPath: `${URL}/employee/portfolio/${employeeId}`,
      path: '',
      errorMessage,
      data,
      profileImage,
    });
  } catch (err) {
    return errorResMsg(res, 500, err.message);
  }
};

// GET AN EMPLOYEE PROFILE -- Renders a page
exports.getProfile = async (req, res) => {
  try {
    const errorMessage = req.query.error_status;
    const success = req.query.success_message;
    const {
      passport
    } = req.session;

    let employeeId;

    if (passport) {
      const { passport: { user } } = req.session;
      const { userTypeId } = user;
      employeeId = userTypeId;
    } else {
      employeeId = req.session.employeeId || req.session.profileId;
    }

    const { profileImage } = req.session;

    if (req.params.employee_id) {
      employeeId = req.params.employee_id;
    }

    const query = await models.Employee.findOne({
      where: { employee_id: employeeId },
      attributes,
    });

    const { data: { email } } = req.session;

    const profile = await query;

    const data = { ...profile.dataValues, email };

    return res.status(200).render('Pages/employeeProfile', {
      pageTitle: 'Talent Pool | Profile',
      dashboardPath: `${URL}/employee/dashboard/${employeeId}`,
      profilePath: `${URL}/employee/profile/${employeeId}`,
      portfolioPath: `${URL}/employee/portfolio/${employeeId}`,
      messagePath: `${URL}/employee/message/${employeeId}`,
      path: '/employee/message',
      errorMessage,
      success,
      data,
      profileImage,
    });
  } catch (err) {
    req.flash('error', 'Something went wrong. Try again');
  }
};

// GET AEMPLOAYEE PORTFOLIOS -- Renders a page
exports.getPortfolio = async (req, res) => {
  try {
    const errorMessage = req.query.error_status;
    const success = req.query.success_message;
    const {
      passport
    } = req.session;

    let employeeId;

    if (passport) {
      const { passport: { user } } = req.session;
      const { userTypeId } = user;
      employeeId = userTypeId;
    } else {
      employeeId = req.session.employeeId || req.session.profileId;
    }

    const { profileImage } = req.session;

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
      dashboardPath: `${URL}/employee/dashboard/${employeeId}`,
      profilePath: `${URL}/employee/profile/${employeeId}`,
      portfolioPath: `${URL}/employee/portfolio/${employeeId}`,
      messagePath: `${URL}/employee/message/${employeeId}`,
      path: '/employee/message',
      errorMessage,
      success,
      data,
      profileImage,
    });
  } catch (err) {
    req.flash('error', 'Something went wrong. Try again');
  }
};

exports.createPortfolio = async (req, res) => {
  try {
    const {
      passport
    } = req.session;

    let employeeId;

    if (passport) {
      const { passport: { user } } = req.session;
      const { userTypeId } = user;
      employeeId = userTypeId;
    } else {
      employeeId = req.session.employeeId || req.session.profileId;
    }

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
    console.log('herer', err);
    req.flash('error', 'Something went wrong. Try again');
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const {
      passport
    } = req.session;

    let employeeId;

    if (passport) {
      const { passport: { user } } = req.session;
      const { userTypeId } = user;
      employeeId = userTypeId;
    }

    employeeId = req.session.userTypeId;
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

// // GET EMPLOAYEE PORTFOLIOS -- Renders a page
// exports.getPortfolio = async (req, res) => {
//   try {
//     const errorMessage = req.query.error_status;
//     const success = req.query.success_message;
//     const {
//       passport
//     } = req.session;

//     let employeeId;

//     if (passport) {
//       const { passport: { user } } = req.session;
//       const { userTypeId } = user;
//       employeeId = userTypeId;
//     }

//     employeeId = req.session.employeeId;

//     if (req.params.employee_id) {
//       employeeId = req.params.employee_id;
//     }

//     const query = await models.Portfolio.findAll({
//       where: { employee_id: employeeId },
//     });

//     const data = await query;

//     return res.status(200).render('Pages/employee-portfolio', {
//       pageTitle: `Talent Pool | ${
//         req.session.firstName ? req.session.firstName : ''
//       }'s Portfolio`,
//       dashboardPath: `${URL}employee/dashboard/${employeeId}`,
//       profilePath: `${URL}employee/profile/${employeeId}`,
//       portfolioPath: `${URL}employee/portfolio/${employeeId}`,
//       path: '',
//       errorMessage,
//       success,
//       data,
//     });
//   } catch (err) {
//     console.log('i cant pass here because', err);
//     req.flash('error', 'Something went wrong. Try again');
//   }
// };

// CREATE EMPLOYEE SKILLS
exports.createSkill = async (req, res) => {
  try {
    const {
      passport
    } = req.session;

    let employeeId;

    if (passport) {
      const { passport: { user } } = req.session;
      const { userTypeId } = user;
      employeeId = userTypeId;
    } else {
      employeeId = req.session.employeeId || req.session.profileId;
    }

    // CREATE A NEW SKILLS
    await models.Skill.create({
      skill_description: req.body.skill_description,
      employee_id: employeeId,
    });

    return res.redirect(
      `/employee/dashboard/${employeeId}?success_message=Skill added successfully`,
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
    const {
      passport
    } = req.session;

    let employeeId;

    if (passport) {
      const { passport: { user } } = req.session;
      const { userTypeId } = user;
      employeeId = userTypeId;
    } else {
      employeeId = req.session.employeeId || req.session.profileId;
    }

    // Update Profile

    const names = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.userName,
    };

    let bodyToUpdate;
    bodyToUpdate = { ...req.body, ...names, employee_id: employeeId };

    if (req.files) {
      const imageUrl = await uploadImageFunction(req, res);
      bodyToUpdate = { image: imageUrl, ...req.body, ...names };
      req.session.profileImage = imageUrl;
    }

    await models.Employee.update(bodyToUpdate, {
      where: { employee_id: employeeId },
      plain: true,
    });

    await models.Employee.findOne({ where: { employee_id: employeeId } });

    // return updated data
    return res.redirect(
      `/employee/dashboard/${employeeId}?success_message=Profile updated successfully`,
    );
  } catch (err) {
    req.flash('error', 'Something went wrong. Try again');
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
