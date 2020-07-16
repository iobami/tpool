const express = require('express');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');
// const { UserValidation } = require('../../Utils/validators/user-validator-new');
const {
  addAdminUser,
  deleteAdminUser,
  blockAdminUser,
  unBlockAdminUser,
  getAllAdminUsers,
  getAdminUser,
} = require('../../Controllers/super-admin/manage-admin');

const router = express.Router();

router.post(
  '/create',
  addAdminUser,
);
router.delete('/:id/delete', deleteAdminUser);
router.patch('/:id/block', blockAdminUser);
router.patch('/:id/unblock', unBlockAdminUser);
router.get('/all', authorize(Role.SuperAdmin), getAllAdminUsers);
router.get('/:id', authorize(Role.SuperAdmin), getAdminUser);

module.exports = router;
