module.exports = {
    adminMessagePage: (req, res) => {
        res.render('Pages/admin-dash-messages', {
            pageName: 'Admin Messages',
            path: '/admin/message',
            error: req.flash('error'),
            errors: req.flash('errors'),
            success: req.flash('success'),
        });
    },

    employerMessagePage: (req, res) => {
        res.render('Pages/employer-messages', {
            pageName: 'Employer Messages',
            error: req.flash('error'),
            errors: req.flash('errors'),
            success: req.flash('success'),
        });
    },

    employeeMessagePage: (req, res) => {
        res.render('Pages/employee-messages', {
            pageName: 'Employer Messages',
            pageTitle: 'TalentPool | Employee Message',
            path: '/employee/message',
            error: req.flash('error'),
            errors: req.flash('errors'),
            success: req.flash('success'),
        });
    },

}