const express = require('express');

const appRoute = express.Router();


const { adminMessagePage } = require('../../../Controllers/views/message/message');
const { employerMessagePage } = require('../../../Controllers/views/message/message');
const { employeeMessagePage } = require('../../../Controllers/views/message/message');
const { adminChatMessages, employerChatMessages, employeeChatMessages } = require('../../../Controllers/views/message/message');


appRoute.get('/admin/message', adminMessagePage);
appRoute.get('/employer/message', employerMessagePage);
appRoute.get('/employee/message', employeeMessagePage);
appRoute.get('/admin/message/:senderID/:receiverID', adminChatMessages);
appRoute.get('/employer/message/:senderID/:receiverID', employerChatMessages);
appRoute.get('/employee/message/:senderID/:receiverID', employeeChatMessages);

module.exports = appRoute;