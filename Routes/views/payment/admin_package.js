const express = require('express');
const appRoute = express.Router();
const {
     create, getAll, packageGet, packageUpdate, 
     get_create, get_packageUpdate, removeAFeature,
     softDeletePackage, createFeature, addAFeature,   
} = require('../../../Controllers/views/payment/admin-package');


// create package routes
appRoute.get('/admin/packages/create', get_create);
appRoute.post('/admin/packages/create', create);

//update package routes
appRoute.get('/admin/packages/:package_id/update', get_packageUpdate);
appRoute.post('/admin/packages/:package_id/update', packageUpdate);

//delete package routes
appRoute.get('/admin/packages/:package_id/delete', softDeletePackage);

//get package detail routes
appRoute.get('/admin/packages/:package_id', packageGet); 

//get all packages route
appRoute.get('/admin/packages', getAll);

//create feature
appRoute.post('/admin/features/create', createFeature);

//add feature to a package
appRoute.post('/admin/packages/:package_id/add', addAFeature);

//remove feature from a package
appRoute.get('/admin/packages/:package_id/remove', removeAFeature);


module.exports = appRoute;