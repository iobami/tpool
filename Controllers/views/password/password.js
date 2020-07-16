const { validationResult } = require('express-validator');
module.exports = {
  
  passwordOTP: (req, res) => {
    res.render('Pages/password/password-otp', { pageName: 'Password OTP',isLoggedIn, });
  },

  passwordReset: (req, res) => {
    
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render('Pages/password/password-reset', {
       pageName: 'Password Reset', 
       token: req.params.resettoken ,
       isLoggedIn:req.session.isLoggedIn,
       errorMessage: message,
      success: req.flash('success'),
      });
  },

  passwordSuccess: (req, res) => {
    res.render('Pages/password/password-success', { pageName: 'Password Success' });
  },

  recoverPassword: (req, res) => {
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    const errors = validationResult(req);
    res.render('Pages/password/recover_password', {
      path: '/recover/password',
      pageName: 'Recover Password',
      isLoggedIn:req.session.isLoggedIn,
      errorMessage: message,
      success: req.flash('success'),
      validationErrors: errors.array()
    });
  },

  updatePassword: (req, res) => {
    res.render('Pages/password/password-update', { pageName: 'Update Password' ,isLoggedIn,});
  },
};


exports.getReset = (req, res, next) => {

};