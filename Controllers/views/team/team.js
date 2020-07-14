const model = require('../../../Models');

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.TALENT_POOL_DEV_URL
    : process.env.TALENT_POOL_FRONT_END_URL;

const sendEmail = require('../../..//Utils/sendEmail');
const { message } = require('../../../Utils/team-invite-template');
const {
  successResMsg,
  errorResMsg,
  sessionSuccessResMsg,
} = require('../../../Utils/response');

module.exports = {
  sendInvite: async (req, res, next) => {
    const { userId } = req.session;
    // const { userId, userTypeId } = req.session;
    const userTypeId = '902abb61-c387-4e15-834e-ea9d38dfc6cb';
    const { email } = req.body;
    if (!userTypeId) {
      return res.status(400).render('Pages/employer-add-a-team', {
        path: 'employer/add/team',
        pageName: 'Team',
        errorMessage: 'Your profile must be created!',
        oldInput: {
          email,
        },
        validationErrors: [],
      });
    }

    try {
      // Check if user exists and is an employee
      const user = await model.User.findOne({
        where: { email, role_id: 'ROL-EMPLOYEE' },
      });

      if (!user) {
        return res.status(404).render('Pages/employer-add-a-team', {
          path: 'employer/add/team',
          pageName: 'Team',
          errorMessage: 'User does not exist or is not an employee!',
          oldInput: {
            email,
          },
          validationErrors: [],
        });
      }

      const employee = await model.Employee.findOne({
        where: { user_id: user.user_id },
      });

      // Get employer details
      const employer = await model.Employer.findOne({
        where: { user_id: userId },
      });
      // Team specific actions
      const team = await model.Team.findOne({
        where: { employer_id: userTypeId },
      });
      const teamName = team ? team.Team_name : employer.employer_name;
      const teamData = {
        Team_name: teamName,
        employee_id: employee.employee_id,
        employer_id: userTypeId,
      };

      // Check if employee is in the team
      const isInTeam = await model.Team.findOne({
        where: { employer_id: userTypeId, employee_id: employee.employee_id },
      });
      const teamResult = isInTeam
        ? res.status(409).render('Pages/employer-add-a-team', {
            path: 'employer/add/team',
            pageName: 'Team',
            errorMessage: 'User is already in or has been invited to this team',
            oldInput: {
              email,
            },
            validationErrors: [],
          })
        : await model.Team.create(teamData);

      // Send email to user
      const inviteLink = `${URL}/team/confirm/?referralCode=${userTypeId}&employee=${employee.employee_id}`;
      try {
        await sendEmail({
          email,
          subject: `${employer.employer_name} has invited you to join the team on TalentPool`,
          message: await message(inviteLink),
        });
      } catch (err) {
        return res.status(200).render('Pages/employer-add-a-team', {
          path: 'employer/add/team',
          pageName: 'Team',
          inviteStatus: 'Invite link not sent. Please retry',
        });
      }

      return res.status(200).render('Pages/employer-add-a-team', {
        path: 'employer/add/team',
        pageName: 'Team',
        inviteStatus: 'Invite link sent',
      });
    } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    }
  },

  verifyInvite: async (req, res, next) => {
    const { referralCode, employee } = req.query;
    try {
      const doesExist = await model.Team.findOne({
        where: { employee_id: employee, employer_id: referralCode },
      });
      if (!doesExist) {
        return res.status(400).render('Pages/team-invite', {
          pageName: 'Team Invite',
          error: req.flash(
            "Employee has not been invited to team or team doesn't exist",
          ),
        });
      }
      await model.Team.update(
        { status: 'Accepted' },
        { where: { employee_id: employee, employer_id: referralCode } },
      );
      return res.status(200).render('Pages/team-invite', {
        path: 'team-invite',
        pageName: 'Team Invite',
        inviteStatus: 'Accepted',
      });
    } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    }
  },
};
