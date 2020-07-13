const express = require("express");
const appRoute = express.Router();

const { verifyModal } = require("../../controllers/admin/verifyModal");

appRoute.get('/verify-modal', verifyModal);

module.exports = appRoute;