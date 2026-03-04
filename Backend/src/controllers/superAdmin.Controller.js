const SuperAdmin = require('../models/SuperAdmin');

// Get all superadmins
const getAllSuperAdmins = async (req, res) => {
  try {
    const superadmins = await SuperAdmin.getAll();
    res.status(200).json({
      success: true,
      data: superadmins
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching superadmins',
      error: error.message
    });
  }
};

// Get superadmin by ID
const getSuperAdminById = async (req, res) => {
  try {
    const superadmin = await SuperAdmin.getById(req.params.id);
    if (!superadmin) {
      return res.status(404).json({
        success: false,
        message: 'SuperAdmin not found'
      });
    }
    res.status(200).json({
      success: true,
      data: superadmin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching superadmin',
      error: error.message
    });
  }
};

// Create new superadmin
const createSuperAdmin = async (req, res) => {
  try {
    const { full_name, username, password } = req.body;

    if (!full_name || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full_name, username, and password'
      });
    }

    // Check if username already exists
    const existing = await SuperAdmin.getByUsername(username);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }

    const id = await SuperAdmin.create(req.body);
    res.status(201).json({
      success: true,
      message: 'SuperAdmin created successfully',
      data: { id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating superadmin',
      error: error.message
    });
  }
};

// Update superadmin
const updateSuperAdmin = async (req, res) => {
  try {
    const { full_name, username, password } = req.body;

    if (!full_name || !username) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full_name and username'
      });
    }

    const affectedRows = await SuperAdmin.update(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'SuperAdmin not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'SuperAdmin updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating superadmin',
      error: error.message
    });
  }
};

// Delete superadmin
const deleteSuperAdmin = async (req, res) => {
  try {
    const affectedRows = await SuperAdmin.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'SuperAdmin not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'SuperAdmin deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting superadmin',
      error: error.message
    });
  }
};

// Login superadmin
const loginSuperAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password'
      });
    }

    const superadmin = await SuperAdmin.getByUsername(username);
    if (!superadmin || superadmin.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Remove password from response
    delete superadmin.password;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: superadmin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

module.exports = {
  getAllSuperAdmins,
  getSuperAdminById,
  createSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
  loginSuperAdmin
};
