const express = require('express');
const router = express.Router();
const {
  getAllSuperAdmins,
  getSuperAdminById,
  createSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
  loginSuperAdmin
} = require('../controllers/superAdmin.Controller');

// Login
router.post('/login', loginSuperAdmin);

// CRUD operations
router.get('/', getAllSuperAdmins);
router.get('/:id', getSuperAdminById);
router.post('/', createSuperAdmin);
router.put('/:id', updateSuperAdmin);
router.delete('/:id', deleteSuperAdmin);

module.exports = router;
