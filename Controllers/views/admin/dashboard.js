const moment = require('moment');
const model = require('../../../Models/index');
const { errorResMsg, successResMsg } = require('../../../Utils/response');

module.exports = {
  faq: (req, res) => {
    res.render('Pages/admin-dash-faq', {
      pageName: 'Faq',
      path: "admin-faq"
    });
  },

  employerMessages: (req, res) => {
    res.render('Pages/admin-dash-employer-msg', {
      pageName: 'Messages for employer',
      path: "admin-dashboard"
    });
  },

  messages: (req, res) => {
    res.render('Pages/admin-dash-messages', {
      pageName: 'Admin dashboard messages',
      path: "admin-messages"
    });
  },


  allEmployers: async (req, res) => {
    try {
      const individuals_array = [];
      const company_array = [];
      const limit = Number(req.query.p) || 1000000000;
      const employers = await model.Employer.findAll({
        limit,
        order: [
          ['id', 'DESC'],
        ],
      });
      const employersAll = await model.Employer.findAll({});
      const data = { data: employers };
      const totalEmployers = employersAll.length;
      employersAll.forEach((employer) => {
        if (employer.employer_type.toLowerCase() === 'individual') {
          individuals_array.push(employer.employer_type);
        }
  
        if (employer.employer_type.toLowerCase() === 'company') {
          company_array.push(employer.employer_type);
        }
      });
  
      res.render('Pages/admin-dash-employers', {
        pageName: 'Admin | All Employers',
        path: 'admin-viewEmployer',
        data,
        totalCompany: company_array.length,
        totalIndividual: individuals_array.length,
        totalEmployers,
      });
    } catch (err) {
      console.log(err);
    }
  },

  allEmployees: (req, res) => {
    res.render('Pages/view-employee-dashboard', {
      pageName: 'View Employee',
      path: "admin-viewEmployee"
    });
  },

  dashboard: (req, res) => {
    res.render('Pages/admin-dashboard', {
      pageName: 'Admin dashboard',
      path: "admin-dashboard"
    });
  },

  adminVerification: (req, res) => {
    res.render('Pages/admin-verification', {
      pageName: 'Admin Verification'
    })
  },

  employeeReview: (req, res) => {
    res.render('Pages/employee-review', {
      pageName: 'Employee Review'
    })
  },

  adminSettings: (req, res) => {
    res.render('Pages/admin-settings', {
      pageName: 'Admin Settings',
      path: "admin-settings"
    })
  },

  adminEmployee: (req, res) => {
    res.render('Pages/admin-viewEmployee', {
      pageName: 'Talent Pool | View Employee',
      path: "admin-viewEmployee"
    })
  },
  adminsList: (req, res) => {
    res.render('Pages/admins-list', {
      pageName: 'Talent Pool | View Employee',
      path: "admins-list"
    })
  }
}