module.exports = {
    passwordOTP: (req, res) => {
        res.render('pages/password/password-otp', {pageName: 'Password OTP'})
    },

    passwordReset: (req, res) => {
        res.render('pages/password/password-reset', {pageName: 'Password Reset'})
    },

    passwordSuccess: (req, res) => {
        res.render('pages/password/password-success', {pageName: 'Password Success'})
    }
}