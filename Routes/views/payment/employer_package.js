const express = require('express');
const Flutterwave = require('flutterwave-node-v3');


const appRoute = express.Router();
const {
  create, getAll, packageGet,
} = require('../../../Controllers/views/payment/employer-package');

// get package detail routes
appRoute.get('/employer/packages/:package_id', packageGet);

// get all packages route
appRoute.get('/employer/packages', getAll);

const {
  TALENT_POOL_FLUTTER_PUBLIC,
  TALENT_POOL_FLUTTER_KEY,
  PRODUCTION_FLAG,
} = process.env;

appRoute.post('/employer/payment', async (req, res) => {
  try {
    const flw = new Flutterwave(
      TALENT_POOL_FLUTTER_PUBLIC,
      TALENT_POOL_FLUTTER_KEY,
      PRODUCTION_FLAG,
    );
    
    let {cardNum} = req.body;
    cardNum = cardNum.replace(/-/g, "");
    const payload = {
     
      card_number: cardNum,
      cvv: req.body.cvvn,
      expiry_month: req.body.expMonth,
      expiry_year: req.body.expYear,
      currency: 'USD',
      amount: req.body.total,
      redirect_url: 'https://www.google.com',
      name: req.body.fullName,
      email: req.body.email,
      phone_number: req.body.phoneNum,
      payment_plan: 6327,
      interval: 'monthly',
      duration: 1,
    };
    console.log(payload);
    const response = await flw.PaymentPlan.create(payload);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = appRoute;
