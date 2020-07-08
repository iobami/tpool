const express = require("express");
const appRoute = express.Router();

const { employerRecommendation } = require('../../controllers/employer/recommendation');

appRoute.get('/employer-recommendation', employerRecommendation);


module.exports = appRoute;




