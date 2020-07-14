const express = require('express');
const appRoute = express.Router();
const {
     create, getAll, packageGet,  
} = require('../../../Controllers/views/payment/employer-package');


//get package detail routes
appRoute.get('/employer/packages/:package_id', packageGet); 

//get all packages route
appRoute.get('/employer/packages', getAll);


module.exports = appRoute;