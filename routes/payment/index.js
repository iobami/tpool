const express = require("express");
const appRoute = express.Router();

const { paymentMethod, paymentSuccess } = require('../../controllers/payment/payment');

appRoute.get('/payment-method', paymentMethod);
appRoute.get('/payment-success', paymentSuccess)

module.exports = appRoute;


