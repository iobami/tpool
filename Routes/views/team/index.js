const express = require('express');
const appRoute = express.Router();

const {
  sendInvite,
  verifyInvite,
  confirmInvite,
} = require('../../../Controllers/views/team/team');

appRoute.post('/employer/add-team', sendInvite);
appRoute.get('/team/verify-invite', verifyInvite);
// appRoute.get('/team/verify-invite', confirmInvite);

module.exports = appRoute;
