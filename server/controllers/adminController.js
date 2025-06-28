const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Admin login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'User deleted successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
}; 