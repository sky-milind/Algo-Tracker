const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Unified Login Controller
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password'
      });
    }

    /* ========= 1. CHECK SUPERADMIN ========= */
    const [superAdmins] = await db.query(
      "SELECT id, full_name, username, password, role FROM superadmin WHERE username = ?",
      [username]
    );

    if (superAdmins.length > 0) {
      const user = superAdmins[0];

      if (user.password !== password) {
        return res.status(401).json({
          success: false,
          message: "Invalid password"
        });
      }

      return sendToken(res, user);
    }

    /* ========= 2. CHECK ADMIN ========= */
    const [admins] = await db.query(
      "SELECT id, full_name, username, password, role, created_by FROM admin WHERE username = ?",
      [username]
    );

    if (admins.length > 0) {
      const admin = admins[0];

      if (admin.password !== password) {
        return res.status(401).json({
          success: false,
          message: "Invalid password"
        });
      }

      return sendToken(res, admin);
    }

    /* ========= NO MATCH ========= */
    return res.status(401).json({
      success: false,
      message: "Invalid username or password"
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
};

/* ========= TOKEN HELPER ========= */
const sendToken = (res, user) => {
  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // 7 days
  );

  // Set token in HTTP-only cookie
  res.cookie('authToken', token, {
    httpOnly: true,        // Prevents XSS attacks
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'lax',       // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
  });

  // Remove password from response
  delete user.password;

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token, // Also send in response body for flexibility
    data: {
      id: user.id,
      full_name: user.full_name,
      username: user.username,
      role: user.role,
      created_by: user.created_by || null
    }
  });
};

// Logout Controller
const logout = async (req, res) => {
  try {
    // Clear the auth cookie
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({
      success: false,
      message: 'Error logging out',
      error: err.message
    });
  }
};

module.exports = {
  login,
  logout
};
