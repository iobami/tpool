const moment = require('moment');
const model = require('../../../Models/index');
const { errorResMsg, successResMsg } = require('../../../Utils/response');

const keysOfArray = (modelResult, arrayObj) => {
  modelResult.map((x) => {
    if (arrayObj.hasOwnProperty(x.dataValues.employee_id)) arrayObj[x.dataValues.employee_id].push(x.dataValues);
    else arrayObj[x.dataValues.employee_id] = [x.dataValues];
  });
  return arrayObj;
};

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
    const csrf = req.csrfToken();
    const { session } = req.cookies;
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
        csrf,
        session,
      });
    } catch (err) {
      console.log(err);
    }
  },

  allEmployees: async (req, res) => {
    const { session } = req.cookies;
    try {
      const limit = Number(req.query.p) || 1000000000;
      const employeesTotal = await model.Employee.findAll({});
      const employees = await model.Employee.findAll({
        limit,
        order: [
          ['id', 'DESC'],
        ],
      });
      const skill = await model.Skill.findAll({ limit });
      const portfolio = await model.Portfolio.findAll({ limit });

      const hashMap = {};
      let skillHashMap = {};
      let portfolioHashMap = {};
      const results = [];
  
      const employees_count = [];
      const available_employees_count = [];
      const hired_employees_count = [];
  
      skillHashMap = keysOfArray(skill, skillHashMap);
  
      portfolioHashMap = keysOfArray(portfolio, portfolioHashMap);
  
      employees.map((x) => {
        hashMap[x.dataValues.employee_id] = x.dataValues;
      });
  
      Object.keys(hashMap).forEach((key) => {
        if (!skillHashMap.hasOwnProperty(key) && !portfolioHashMap.hasOwnProperty(key)) {
          hashMap[key] = { ...hashMap[key], skills: [], portfolios: [] };
        } else if (skillHashMap.hasOwnProperty(key) && !portfolioHashMap.hasOwnProperty(key)) {
          hashMap[key] = { ...hashMap[key], skills: JSON.parse(JSON.stringify(skillHashMap[key])), portfolios: [] };
        } else if (!skillHashMap.hasOwnProperty(key) && portfolioHashMap.hasOwnProperty(key)) {
          hashMap[key] = { ...hashMap[key], skills: [], portfolios: JSON.parse(JSON.stringify(portfolioHashMap[key])) };
        } else if (skillHashMap.hasOwnProperty(key) && portfolioHashMap.hasOwnProperty(key)) {
          hashMap[key] = { ...hashMap[key], skills: JSON.parse(JSON.stringify(skillHashMap[key])), portfolios: JSON.parse(JSON.stringify(portfolioHashMap[key])) };
        }
        results.push(hashMap[key]);
      });
  
      const data = { all_employee_data: results };
      // console.log(data);
      // eslint-disable-next-line no-shadow
      employeesTotal.forEach((data) => {
        employees_count.push(data);
        if (data.availability.toLowerCase() === 'not-available') {
          hired_employees_count.push(data);
        }
        if (data.availability.toLowerCase() === 'available') {
          available_employees_count.push(data);
        }
      });
      res.render('Pages/admin-viewEmployee', {
        pageName: 'View Employee',
        path: 'admin-viewEmployee',
        totalEmployees: employees_count.length,
        availableEmployees: available_employees_count.length,
        hiredEmployees: hired_employees_count.length,
        data: data.all_employee_data,
        moment,
        csrf: req.csrfToken(),
        session,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
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