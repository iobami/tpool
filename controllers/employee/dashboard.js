var jwtDecode = require('jwt-decode');
var axios = require('axios');
const jwt = require("jsonwebtoken");
 const userInformation = 'eee5269b-f4e7-4058-bcf5-77b4b2834c97';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9kdXR1c2lub21vd3VubWlAZ21haWwuY29tIiwidXNlcklkIjoiZWVlNTI2OWItZjRlNy00MDU4LWJjZjUtNzdiNGIyODM0Yzk3IiwidXNlclJvbGUiOiJST0wtRU1QTE9ZRUUiLCJ1c2VyVHlwZUlkIjoiOWM2MzFmYzctNjViNC00ZDFiLTlkNGEtMTE4OTUxZjRkMzcxIiwiaWF0IjoxNTk0MTAxNjI1LCJleHAiOjE1OTQxODgwMjV9.V5y8ztfmM-M48KOJlL2ZjfZuQ9y8iSm-ByP9bUsskXc';
const decodedToken = jwtDecode(token);
console.log(decodedToken);
const userId = decodedToken.userTypeId;

exports.getEmployeeDash = async (req, res, next) => {

  try {


    const userSkill = await axios.get(` https://api.lancers.app/v1/employee/skill/${userId}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    // const userPortfolio = await axios.get(`  https://api.lancers.app/v1/employee/portfolios/${userId}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })

    const userProfile = await axios.get(`https://api.lancers.app/v1/employee/profile/${userId}`, {
      headers: {
       Authorization: `Bearer ${token}`,
      },
    })
    // console.log(userSkill.data.data)
    let employeeSkill = userSkill.data.data.skills;
    let employeeProfile = userProfile.data.data;
    // console.log(userProfile.data.data.availability);
    console.log(employeeSkill);
    // .then((res) => {
    //   const data = res.data;
    res.render("employee-dashboard", {
      pageTitle: "Talent Pool | Employee Dashboard",
      path: "employee-dashboard",
      employeeProfile,
      decodedToken,
      employeeSkill,
      // userPortfolio
      user: {
        name: "bolarin",
        role: "employee",
        stack: "UI?UX designer",
        location: "Toronto,Canada",
        email: "odutusinmoses@gmail.com",
        phone: "08147793653",
        socials: {
          twitter: "@Anosike_UI",
          dribble: "https://dribble.com/dribble",
          behance: "https://www.behance.net/behance",
        },
      },
      userSkill: [
        {
          id: 32,
          skill_description: 'figma',
          skill_track: null,
          employee_id: '9c631fc7-65b4-4d1b-9d4a-118951f4d371',
          createdAt: '2020-07-07T06:53:58.000Z',
          updatedAt: '2020-07-07T06:53:58.000Z',
          deletedAt: null,
          EmployeeEmployeeId: null
        },
        {
          id: 33,
          skill_description: 'Vuejs',
          skill_track: null,
          employee_id: '9c631fc7-65b4-4d1b-9d4a-118951f4d371',
          createdAt: '2020-07-07T06:54:11.000Z',
          updatedAt: '2020-07-07T06:54:11.000Z',
          deletedAt: null,
          EmployeeEmployeeId: null
        },
        {
          id: 34,
          skill_description: 'Nodejs',
          skill_track: null,
          employee_id: '9c631fc7-65b4-4d1b-9d4a-118951f4d371',
          createdAt: '2020-07-07T06:54:23.000Z',
          updatedAt: '2020-07-07T06:54:23.000Z',
          deletedAt: null,
          EmployeeEmployeeId: null
        }
      ],
      jobs: {
        available: 12,
        appliedFor: 2,
      },
      applications: {
        pending: 2,
      },
    });
    // })
  }

  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getEmployeeMessages = (req, res, next) => {
  res.render("employee-messages", {
    pageTitle: "Talent Pool | Employee Messages",
    path: "employee-messages",
  });
};

exports.getEmployeeProfile = async (req, res, next) => {
  try {
    const userProfile = await axios.get(`https://api.lancers.app/v1/employee/profile/${userId}`, {
      headers: {
       Authorization: `Bearer ${token}`,
      },
    })
    let employeeProfile = userProfile.data.data;
    res.render("employeeProfile", {
      pageTitle: "Talent Pool | Employee Profile",
      path: "employee-profile",
      employeeProfile,
      decodedToken
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};

exports.getEmployeeAddTeam = (req, res, next) => {
  res.render("employee-addTeam", {
    pageTitle: "Talent Pool | Employee Add Team",
    path: "employee-addTeam",
  });
};

exports.getEmployeeSupport = (req, res, next) => {
  res.render("employee-support", {
    pageTitle: "Talent Pool | Employee Support",
    path: "employee-support",
  });
};

exports.getEmployeeSettings = (req, res, next) => {
  res.render("employee-settings", {
    pageTitle: "Talent Pool | Employee Settings",
    path: "employee-settings",
  });
};

exports.getEmployeeEmployees = (req, res, next) => {
  res.render("employee-employees", {
    pageTitle: "Talent Pool | Employee Employees",
    path: "/employee-employees",
  });
};


exports.getEmployeeProfileCreation = (req, res, next) => {
  res.render("employee-profile-creation", {
    pageTitle: "TalentPool | Employer Create Profile",
    path: "/employee-profileCreation",
  });
};
