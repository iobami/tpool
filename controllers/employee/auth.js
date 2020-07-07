module.exports = {
  employeeSignIn: (req, res) => {
      res.render('employee-sign-in', { pageName: 'Employee Sign In' });
    },
    
    employeeSignup: (req, res) => {
      res.render('employee-sign-up', { pageName: 'Sign Up'});
    }
}

