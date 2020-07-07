module.exports = {
    passwordOTP: (req, res) => {
        res.render('Pages/password/password-otp', {pageName: 'Password OTP'})
    },

    passwordReset: (req, res) => {
        res.render('Pages/password/password-reset', {pageName: 'Password Reset'})
    },

    recoverPassword: (req, res) => {
        res.render('Pages/password/recover_password', { pageName: 'Recover Password' });
    },
}