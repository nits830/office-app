const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const isValidIndianPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = (phone, otp) => {
  console.log(`Sending OTP ${otp} to phone number ${phone}`);
  // Replace with SMS API in production
};


exports.signup = async (req, res) => {
    const { name, phone, email, batchYear } = req.body;
  
    if (!isValidIndianPhone(phone)) {
      return res.status(400).json({ message: "Invalid Indian phone number" });
    }
  
    const existingUser = await prisma.user.findUnique({ where: { phone } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please sign in." });
    }
  
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  
    await prisma.user.create({
      data: {
        name,
        phone,
        email,
        batchYear: parseInt(batchYear),
        otp,
        otpExpiry,
        isVerified: false,
      },
    });
  
    sendOTP(phone, otp);
    res.status(200).json({ message: "Signup successful. OTP sent." });
  };


  exports.signin = async (req, res) => {
    const { phone } = req.body;
  
    if (!isValidIndianPhone(phone)) {
      return res.status(400).json({ message: "Invalid Indian phone number" });
    }
  
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up." });
    }
  
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  
    await prisma.user.update({
      where: { phone },
      data: { otp, otpExpiry },
    });
  
    sendOTP(phone, otp);
    res.status(200).json({ message: "OTP sent for login" });
  };
  
// Final OTP Verification + JWT

exports.verifyOtp = async (req, res) => {
    const { phone, otp } = req.body;
  
    const user = await prisma.user.findUnique({ where: { phone } });
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    if (new Date() > user.otpExpiry) {
      //  Clean up user if OTP expired and not verified
      if (!user.isVerified) {
        await prisma.user.delete({ where: { phone } });
      }
      return res.status(400).json({ message: "OTP expired. Please sign up again." });
    }
  
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  
    //  OTP is valid → mark verified
    await prisma.user.update({
      where: { phone },
      data: { isVerified: true, otp: null, otpExpiry: null },
    });
  
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
    res.json({ message: "Login successful", token });
  };
  
  