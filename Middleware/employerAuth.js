const db = require('../Models');
const employerss = db.Employer;
const mainuser = db.User;
module.exports = {
  authemployer: async (req, res, next) => {
    //get this token to check for the employer id
    const id = req.session.userId;
    if (!id) return res.redirect('/employer/sign-in');
    try {
      //first find if the user exist
      const getuser = await mainuser.findAll({
        where: {
          user_id: id,
        },
      });
      if (!getuser) return res.redirect('/employer/sign-in');
      //check if user has created profile
      const getemployer = await employerss.findAll({
        where: {
          user_id: id,
        },
      });
      //go back to file creation page
      if (!getemployer) return res.redirect('/employer/profile/create');
      req.session.employerId = getemployer[0].dataValues.employer_id;
      // now to check if the user has uploaded document
      if (getemployer[0].dataValues.verification_status === 'Pending') {
        return res.redirect('/employer/certificate');
      } else if (getemployer[0].dataValues.verification_status === 'Uploaded') {
        return res.redirect('/employer/dasboard/success');
      } else if (
        getemployer[0].dataValues.verification_status === 'Disapproved'
      ) {
        return res.redirect('/employer/dashboard/failure');
      }

      next();
    } catch (error) {
      res.send(error);
    }
  },
};
