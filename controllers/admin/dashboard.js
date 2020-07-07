module.exports = {
  faq : (req, res) => {
     res.render('Pages/admin-dash-faq', { pageName: 'Faq'});
   },
 
   employerMessages: (req, res) => {
     res.render('Pages/admin-dash-employer-msg', { pageName: 'Messages for employer'});
   },

   messages: (req, res) => {
     res.render('Pages/admin-dash-messages', { pageName: 'Admin dashboard messages'});
   },

   allEmployers: (req, res) => {
    res.render('Pages/admin-dash-employers', { pageName: 'Admin | All Employers'})
   }
 }