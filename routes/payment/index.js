const express = require("express");
const appRoute = express.Router();

<<<<<<< HEAD
const { paymentMethod, paymentSuccess } = require('../../controllers/payment/payment');

appRoute.get('/payment-method', paymentMethod);
appRoute.get('/payment-success', paymentSuccess)
=======
const { paymentMethod, paymentSuccessModal } = require('../../controllers/payment/payment');

appRoute.get('/payment-method', paymentMethod);
appRoute.get('/payment-success-modal', paymentSuccessModal);
>>>>>>> f4380ed775c0e45c8e840497681b8f92a2c40bd7

module.exports = appRoute;


