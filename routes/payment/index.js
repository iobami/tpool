const express = require("express");
const appRoute = express.Router();

const { paymentMethod } = require('../../controllers/payment/payment');

appRoute.get('/payment-method', paymentMethod);

module.exports = appRoute;


