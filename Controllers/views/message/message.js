/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const Sequelize = require('sequelize');
const model = require('../../../Models/index');
const { errorResMsg, successResMsg } = require('../../../Utils/response');

const { Op } = Sequelize;

module.exports = {
    adminMessagePage: async (req, res) => {
        try {

            //Get chat users
            const adminChatUsers = await model.Admin.findAll({
                attributes: ['user_id', 'first_name', 'last_name', 'image']
            });

            res.status(200).render('Pages/admin-dash-messages', {
                pageName: 'Admin Messages',
                pageTitle: 'TalentPool | Admin Message',
                adminChatUsers,
                path: '/admin/message',
                error: req.flash('error'),
                errors: req.flash('errors'),
                success: req.flash('success')
            });
        } catch (err) {
            console.log(err)
            return errorResMsg(res, 500, 'Ops!, An error occurred');
        }

    },

    employerMessagePage: async (req, res) => {
        try {
            //Get employer chat users
            const employerChatUsers = await model.Employer.findAll({
                attributes: ['user_id', 'employer_name', 'image']
            });

            res.status(200).render('Pages/employer-messages', {
                pageName: 'Employer Messages',
                pageTitle: 'TalentPool | Employer Message',
                employerChatUsers,
                error: req.flash('error'),
                errors: req.flash('errors'),
                success: req.flash('success')
            });
        } catch (err) {
            console.log(err)
            return errorResMsg(res, 500, 'Ops!, An error occurred');
        }

    },

    employeeMessagePage: async (req, res) => {
        try {
            //Get employee chat users
            const employeeChatUsers = await model.Employee.findAll({
                attributes: ['user_id', 'first_name', 'last_name', 'image']

            });
            res.status(200).render('Pages/employee-messages', {
                pageName: 'Employer Messages',
                pageTitle: 'TalentPool | Employee Message',
                employeeChatUsers,
                path: '/employee/message',
                error: req.flash('error'),
                errors: req.flash('errors'),
                success: req.flash('success')
            });
        } catch (err) {
            console.log(err)
            return errorResMsg(res, 500, 'Ops!, An error occurred');
        }
    }

}