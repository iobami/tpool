const express = require("express");

const appRoute = express.Router();

appRoute.get('/', (req, res) => {
  res.render('index', { pageName: 'Home' });
});

module.exports = appRoute;