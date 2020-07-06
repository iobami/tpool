module.exports = {
    employeeLogin: (req, res) => {
        res.render('employee-sign-in', { title: 'TalentPool | Employee Sign In' });
      },
    
      recoverPassword: (req, res) => {
        res.render('recover_password', { title: 'Talent Pool | Recover Password' });
      },
}

