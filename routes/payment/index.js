const express = require("express");
const appRoute = express.Router();

const { paymentMethod, paymentSuccessModal } = require('../../controllers/payment/payment');

appRoute.get('/payment-method', paymentMethod);
appRoute.get('/payment-success-modal', paymentSuccessModal);

module.exports = appRoute;


