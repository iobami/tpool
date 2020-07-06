const express = require("express");

const appRoute = express.Router();

appRoute.get('/', (req, res) => {
  res.render('index', { variable: 'Hello Guys' });
});

module.exports = appRoute;