const express = require("express");
const appRoute = express.Router();

const { topTalents } = require('../../controllers/employee/topTalents');

appRoute.get('/topTalents', topTalents);

module.exports = appRoute;