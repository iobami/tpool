const express = require('express');
const { authorize } = require('../../Middleware/index');
const { authorizeSuperAdmin } = require('../../Middleware/admin-auth');
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
router.delete('/:id/delete', authorizeSuperAdmin, deleteAdminUser);
router.patch('/:id/block', authorizeSuperAdmin, blockAdminUser);
router.patch('/:id/unblock', authorizeSuperAdmin, unBlockAdminUser);
router.get('/all', authorize(Role.SuperAdmin), getAllAdminUsers);
router.get('/:id', authorize(Role.SuperAdmin), getAdminUser);

module.exports = router;
