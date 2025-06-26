const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);         // New user
router.post('/signin', authController.signin);         // Existing user
router.post('/verify-otp', authController.verifyOtp);  // OTP verification

module.exports = router;
