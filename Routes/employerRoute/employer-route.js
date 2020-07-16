/* eslint-disable camelcase */
const express = require('express');
const employer_controller = require('../../Controllers/employer/employer-controller');

const route = express.Router();
route.post('/create', employer_controller.create);
route.put('/update', employer_controller.updateemployer);
route.put('/update/individual', employer_controller.updateindividual);
route.get('/getemployer/:id', employer_controller.getemployerdetails);
route.post('/uploaddocument', employer_controller.documentupload);
route.get('/getdocument/:id', employer_controller.getemployersdocument);
route.put('/update/individual', employer_controller.updateindividual);
module.exports = route;
