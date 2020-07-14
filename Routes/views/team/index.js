const express = require('express');
const appRoute = express.Router();

const {
  sendInvite,
  verifyInvite,
  viewMembers,
} = require('../../../Controllers/views/team/team');

appRoute.post('/employer/add/team', sendInvite);
// appRoute.get('/employer/add/team', viewMembers);

// teamRoute.get('/employer/add/team', sendInvite);
// appRoute.get('/team/verify-invite', verifyInvite);

module.exports = appRoute;
