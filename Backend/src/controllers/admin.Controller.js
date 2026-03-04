const Admin = require('../models/Admin');

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.getAll();
    res.status(200).json({
      success: true,
      data: admins
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admins',
      error: error.message
    });
  }
};

// Get admin by ID
const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.getById(req.params.id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin',
      error: error.message
    });
  }
};

// Create new admin (by superadmin)
const createAdmin = async (req, res) => {
  try {
    const { full_name, username, password, created_by } = req.body;

    if (!full_name || !username || !password || !created_by) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full_name, username, password, and created_by'
      });
    }

    // Check if username already exists
    const existing = await Admin.getByUsername(username);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }

    const id = await Admin.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: { id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating admin',
      error: error.message
    });
  }
};

// Update admin
const updateAdmin = async (req, res) => {
  try {
    const { full_name, username, password } = req.body;

    if (!full_name || !username) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full_name and username'
      });
    }

    const affectedRows = await Admin.update(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Admin updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating admin',
      error: error.message
    });
  }
};

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    const affectedRows = await Admin.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting admin',
      error: error.message
    });
  }
};

// Get admins by creator (superadmin)
const getAdminsByCreator = async (req, res) => {
  try {
    const admins = await Admin.getByCreator(req.params.superadminId);
    res.status(200).json({
      success: true,
      data: admins
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admins',
      error: error.message
    });
  }
};

// Login admin
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password'
      });
    }

    const admin = await Admin.getByUsername(username);
    if (!admin || admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Remove password from response
    delete admin.password;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: admin
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
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminsByCreator,
  loginAdmin
};
