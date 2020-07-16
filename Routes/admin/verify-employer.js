const express = require('express');
const { verifyEmployer, disapproveEmployer } = require('../../Controllers/admin/verify-employer');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');

const router = express.Router();

// Update user verification status
router
  .route('/verify/employer/:employer_id', authorize([Role.Admin, Role.SuperAdmin]))
  .patch(verifyEmployer);

router
  .route('/unverify/employer/:employer_id', authorize([Role.Admin, Role.SuperAdmin]))
  .patch(disapproveEmployer);

module.exports = router;
