exports.getEmployerSignup = (req, res, next) => {
    res.render('employer-signup', {
        pageName: 'Employer Signup'
    });
};

