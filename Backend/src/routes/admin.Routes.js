const express = require('express');
const router = express.Router();
const {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminsByCreator,
  loginAdmin
} = require('../controllers/admin.Controller');

// Login
router.post('/login', loginAdmin);

// CRUD operations
router.get('/', getAllAdmins);
router.get('/:id', getAdminById);
router.post('/', createAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

// Get admins by creator (superadmin)
router.get('/creator/:superadminId', getAdminsByCreator);

module.exports = router;
