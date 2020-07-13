const express = require("express");
const appRoute = express.Router();

const { employerMetrics } = require('../../controllers/employer/metrics');

appRoute.get('/employer-metrics', employerMetrics);


module.exports = appRoute;




