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
    //get messages from db
    const url = 'https://api.lancers.app/v1/message/chat-users';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJpbGxtYWwwNzFAZ21haWwuY29tIiwidXNlcklkIjoiYWE2MjRkMGYtYjgzZi00MzQ3LWIwZjAtYWQxY2Q4NTJhNzU2IiwidXNlclJvbGUiOiJST0wtRU1QTE9ZRVIiLCJ1c2VyVHlwZUlkIjpudWxsLCJpYXQiOjE1OTQyMDgxNjQsImV4cCI6MTU5NDI5NDU2NH0.tuwAyP1Zii-5JyUeqt4Qrby7V4MbYjSr4ZSCvG-FoQc';
    const allMessages = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res)=> console.log(res.data))
      .catch((err)=> console.log(err))

    res.render('Pages/admin-dash-messages', {
      pageName: 'Admin dashboard messages',
      path: "admin-messages"
    });
  },


  allEmployers: (req, res) => {
    res.render('Pages/admin-dash-employers', {
      pageName: 'Admin | All Employers',
      path: "admin-all-employers"
    })
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