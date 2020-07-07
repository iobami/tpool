const path = require('path');
const express = require('express');
// const cookieParser = require('cookie-parser');
const appRoute = require('./routes');
const adminRoute = require('./routes/admin/auth');
const employeeAuthRoute = require('./routes/employee/auth');
const employeeDashboardRoute = require('./routes/employee/dashboard');
const employerAuthRoute = require('./routes/employer/auth');
const employerDashboardRoute = require('./routes/employer/dashboard');
const passwordRoute = require('./routes/password/index');


const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//All routes
app.use(appRoute);
//app.use(adminRoute);
app.use(employeeAuthRoute);
app.use(employeeDashboardRoute);
app.use(employerAuthRoute);
app.use(employerDashboardRoute);
app.use(passwordRoute);

module.exports = app;
