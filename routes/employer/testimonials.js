const express = require("express");
const appRoute = express.Router();

const { testimonials } = require('../../controllers/employer/testimonials');

appRoute.get('/testimonials', testimonials);

module.exports = appRoute;