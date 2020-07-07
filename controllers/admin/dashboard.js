module.exports = {
  faq : (req, res) => {
     res.render('Pages/admin-dash-faq', { pageName: 'Faq'});
   },
 
   employerMessages: (req, res) => {
     res.render('Pages/admin-dash-employer-msg', { pageName: 'Messages for employer'});
   },

   adminVerification: (req, res) => {
    res.render('Pages/admin-verification', {pageName: 'Admin Verification'})
}
}