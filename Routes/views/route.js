const express = require("express");

//import signup controller
const employerSignupController = require('../controllers/employer-signup');


const appRoute = express.Router();

appRoute.get('/', (req, res) => {
  res.render('index', {
    title: 'Home'
  });
});

appRoute.get('/employer-signup', employerSignupController.getEmployerSignup);



module.exports = appRoute;