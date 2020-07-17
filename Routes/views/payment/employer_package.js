const express = require('express');
const Flutterwave = require('flutterwave-node-v3');


const appRoute = express.Router();

const {
  create, getAll, packageGet,
} = require('../../../Controllers/views/payment/employer-package');

// get package detail routes
appRoute.get('/employer/packages/:package_id', packageGet);

appRoute.get('/employer/packages', getAll);



const {
  TALENT_POOL_FLUTTER_PUBLIC,
  TALENT_POOL_FLUTTER_KEY,
  PRODUCTION_FLAG,
} = process.env;

//Payment Route
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
    
    const payment = await flw.PaymentPlan.create(payload);
    console.log(payment);
    if( payment.status == 'success'){
      //Success Response
    req.flash('success', payment.message)
    req.payment = payment;
    res.redirect('/employer/packages');
    } else {
      //error Response
      req.flash('error', payment.message)
      res.redirect('back')
    }
    
  } catch (error) {
    console.log(error);
    res.redirect('back')
  }
});



module.exports = appRoute;

