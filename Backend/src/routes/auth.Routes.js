const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/auth.Controller');

// Unified login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

module.exports = router;
