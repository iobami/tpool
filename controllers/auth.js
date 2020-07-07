module.exports = {
    employeeSignIn: (req, res) => {
        res.render('employee-sign-in', { pageName: 'Employee Sign In' });
      },

    employerProfileCreation: (req, res) => {
      res.render('employer-profile-creation', { pageName: 'Create Profile' })
    }
    
}

