const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin login
router.post('/login', adminController.login);

// Fetch all users
router.get('/users', adminController.getAllUsers);

// Delete user by ID
router.delete('/users/:id', adminController.deleteUser);

module.exports = router; 