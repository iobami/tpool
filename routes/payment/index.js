const express = require("express");
const appRoute = express.Router();

const { paymentMethod, paymentSuccessModal, pricePayment } = require('../../controllers/payment/payment');

appRoute.get('/payment-method', paymentMethod);
appRoute.get('/payment-success-modal', paymentSuccessModal);
appRoute.get('/price-payment', pricePayment);

module.exports = appRoute;


