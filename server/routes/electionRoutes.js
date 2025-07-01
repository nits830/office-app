const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/elections - Get all elections with candidates
router.get('/', async (req, res) => {
  try {
    const elections = await prisma.election.findMany({
      include: {
        candidates: {
          select: {
            id: true,
            name: true,
            isWinner: true,
            remarks: true,
          },
        },
      },
      orderBy: {
        year: 'desc',
      },
    });

    res.json(elections);
  } catch (error) {
    console.error('Error fetching elections:', error);
    res.status(500).json({ error: 'Failed to fetch elections' });
  }
});

// GET /api/elections/:id - Get specific election
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const election = await prisma.election.findUnique({
      where: { id: parseInt(id) },
      include: {
        candidates: {
          select: {
            id: true,
            name: true,
            isWinner: true,
            remarks: true,
          },
        },
      },
    });

    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }

    res.json(election);
  } catch (error) {
    console.error('Error fetching election:', error);
    res.status(500).json({ error: 'Failed to fetch election' });
  }
});

// POST /api/elections - Create a new election for a specific post
router.post('/', async (req, res) => {
  try {
    const { year, post, startTime, endTime, candidateIds } = req.body;
    if (!year || !post || !startTime || !endTime || !candidateIds || !Array.isArray(candidateIds)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const election = await prisma.election.create({
      data: {
        year,
        post,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        candidates: {
          connect: candidateIds.map(id => ({ id })),
        },
      },
      include: {
        candidates: {
          select: {
            id: true,
            name: true,
            isWinner: true,
            remarks: true,
          },
        },
      },
    });

    res.status(201).json(election);
  } catch (error) {
    console.error('Error creating election:', error);
    res.status(500).json({ error: 'Failed to create election' });
  }
});

module.exports = router; 