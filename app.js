const path = require('path');
const express = require('express');
// const cookieParser = require('cookie-parser');
const appRoute = require('./routes');
const adminDashRoute = require('./routes/admin/dashboard');
const employeeAuthRoute = require('./routes/employee/auth');
const employeeDashboardRoute = require('./routes/employee/dashboard');
const employerAuthRoute = require('./routes/employer/auth');
const employerDashboardRoute = require('./routes/employer/dashboard');
const topTalentsRoute = require('./routes/employee/topTalents');
const testimonialsRoute = require('./routes/employer/testimonials');
const directoryRoute = require('./routes');
const passwordRoute = require('./routes/password/index');
const paymentRoute = require('./routes/payment/index');
const adminAuthRoute = require('./routes/admin/auth');
const employerMetrics = require('./routes/employer/metrics');
const employerRecommendation = require('./routes/employer/recommendation');
const verifyModal = require('./routes/admin/verifyModal');


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
app.use(adminDashRoute);
app.use(topTalentsRoute);
app.use(testimonialsRoute);
app.use(directoryRoute);
app.use(passwordRoute);
app.use(paymentRoute);
app.use(adminAuthRoute);
app.use(employerMetrics);
app.use(employerRecommendation);
app.use(verifyModal);

module.exports = app;
