exports.getEmployerSignup = (req, res, next) => {
    res.render('employer-sign-up', {
        pageName: 'Employer Signup'
    });
};

