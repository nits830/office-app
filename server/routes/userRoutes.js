const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/users - fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { isDeleted: false }, 
      select: { id: true, name: true, email: true },
      orderBy: { id: 'asc' },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// PUT /api/users/:id - update user name and email
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email },
      select: { id: true, name: true, email: true },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// PATCH /api/users/:id/soft-delete - soft delete a user
router.patch('/:id/', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { isDeleted: true },
        select: { id: true, name: true, email: true, isDeleted: true },
      });
      res.json(user);
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(500).json({ error: 'Failed to soft delete user', details: error.message });
    }
  });

module.exports = router; 