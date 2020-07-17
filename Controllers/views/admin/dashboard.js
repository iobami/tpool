const moment = require('moment');
const sequelize = require('sequelize');
const model = require('../../../Models/index');
const { errorResMsg, successResMsg } = require('../../../Utils/response');

const op = sequelize.Op;

const keysOfArray = (modelResult, arrayObj) => {
  modelResult.map((x) => {
    if (arrayObj.hasOwnProperty(x.dataValues.employee_id)) arrayObj[x.dataValues.employee_id].push(x.dataValues);
    else arrayObj[x.dataValues.employee_id] = [x.dataValues];
  });
  return arrayObj;
};
const { packages } = require('../payment/packagesObj');

module.exports = {
  faq: (req, res) => {
    res.render('Pages/admin-dash-faq', {
      pageName: 'Faq',
      path: 'admin-faq',
      currentUser: req.session.name,
    });
  },

  employerMessages: (req, res) => {
    res.render('Pages/admin-dash-employer-msg', {
      pageName: 'Messages for employer',
      path: 'admin-dashboard',
      currentUser: req.session.name,
    });
  },

  messages: (req, res) => {
    res.render('Pages/admin-dash-messages', {
      pageName: 'Admin Messages',
      path: 'admin-messages',
      currentUser: req.session.name,
    });
  },

  allEmployers: async (req, res) => {
    const csrf = req.csrfToken();
    const { session } = req.cookies;
    try {
      const employersAll = await model.Employer.findAll({});
      const individuals_array = [];
      const company_array = [];
      const limit = Number(req.query.p) || Number(employersAll.length);
      const employers = await model.Employer.findAll({
        include: [
          {
            model: model.User,
            where: {
              user_id: { [op.col]: 'Employer.user_id' },
            },
          },
        ],
        limit,
        order: [
          ['id', 'DESC'],
        ],
      });

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
        path: 'admin-all-employers',
        data,
        totalCompany: company_array.length,
        totalIndividual: individuals_array.length,
        totalEmployers,
        csrf,
        session,
        currentUser: req.session.name,
      });
    } catch (err) {
      console.log(err);
    }
  },

  allEmployees: async (req, res) => {
    const { session } = req.cookies;
    try {
      const employeesTotal = await model.Employee.findAll({});
      const limit = Number(req.query.p) || Number(employeesTotal.length);
      const employees = await model.Employee.findAll({
        include: [
          {
            model: model.User,
            where: {
              user_id: { [op.col]: 'Employee.user_id' },
            },
          },
        ],
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
      // accessing the include
      // data.all_employee_data.forEach((user) => {
      //   console.log(user.User.block);
      // });

      // eslint-disable-next-line no-shadow
      employeesTotal.forEach((data) => {
        employees_count.push(data);
        if (data.availability.toLowerCase() === 'not-available') {
          hired_employees_count.push(data);
        }
        // eslint-disable-next-line no-constant-condition
        if (data.availability.toLowerCase() !== 'not-available') {
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
        currentUser: req.session.name,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  },

  dashboard: async (req, res) => {
    const employers = await model.Employer.findAll({});
    const employees = await model.Employee.findAll({});

    const allTransactions = await model.Transaction.findAndCountAll({
      order: [
        ['id', 'DESC'],
      ],
    });
    const latestEmployers = await model.Employer.findAll({
      limit: 10,
      order: [
        ['id', 'DESC'],
      ],
    });
    const Transactions = await model.Transaction.findAll({
      where: {
        active: 1,
      },
    });
    const transactDetails = allTransactions.rows;
    const latestTransactions = allTransactions.rows.slice(0, 5);

    res.render('Pages/admin-dashboard', {
      pageName: 'Admin dashboard',
      path: 'admin-dashboard',
      totalEmployer: employers,
      totalEmployee: employees,
      allTransactions: allTransactions.count,
      latestEmployers,
      latestTransactions,
      activeTransactions: Transactions.length,
      transactDetails,
      message: req.query.message,
      currentUser: req.session.name,
    });
  },

  adminVerification: (req, res) => {
    res.render('Pages/admin-verification', {
      pageName: 'Admin Verification',
      path: 'admins-verification',
      currentUser: req.session.name,
    });
  },

  employeeReview: (req, res) => {
    res.render('Pages/employee-review', {
      pageName: 'Employee Review',
    });
  },

  adminSettings: (req, res) => {
    res.render('Pages/admin-settings', {
      pageName: 'Admin Settings',
      path: 'admin-settings',
      currentUser: req.session.name,
    });
  },

  adminEmployee: (req, res) => {
    res.render('Pages/admin-viewEmployee', {
      pageName: 'Talent Pool | View Employee',
      path: 'admin-viewEmployee',
    });
  },

  adminsList: async (req, res) => {
    const allAdmins = await model.Admin.findAll({
      include: [
        {
          model: model.User,
          where: {
            user_id: { [op.col]: 'Admin.user_id' },
          },
        },
      ],
      order: [
        ['id', 'DESC'],
      ],
    });

    res.render('Pages/admins-list', {
      pageName: 'Talent Pool | View Admins',
      path: 'admins-list',
      allAdmins,
      currentUser: req.session.name,
    });
  },

  managePackages: (req, res) => {
    res.render('Pages/admin/getAllpackages', {
      pageName: 'Manage Packages',
      path: 'manage-packages',
      data: packages,
      currentUser: req.session.name,
    });
  },
};
