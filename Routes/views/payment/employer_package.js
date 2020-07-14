const express = require('express');
const appRoute = express.Router();
const {
     create, getAll, packageGet, packageUpdate, softDeletePackage, createFeature, addAFeature, removeAFeature 
} = require('../../../Controllers/views/payment/admin-package');


//get package detail routes
appRoute.get('/employer/packages/:package_id', packageGet); 

//get all packages route
appRoute.get('/employer/packages', getAll);


module.exports = appRoute;