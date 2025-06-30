// POST /vote/submit

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.submitVote = async (req, res) => {
  const { userId, candidateId } = req.body;

  // Fetch user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.isVerified) {
    return res.status(403).json({ error: 'User not verified' });
  }

  // Fetch candidate and related election
  const candidate = await prisma.candidate.findUnique({
    where: { id: candidateId },
    include: { election: true },
  });

  if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

  const now = new Date();
  const { startTime, endTime, year } = candidate.election;

  // Check time validity
  if (now < startTime || now > endTime) {
    return res.status(403).json({ error: 'Voting is not open for this election' });
  }

  // Register vote
  try {
    const vote = await prisma.vote.create({
      data: {
        userId,
        candidateId,
        votedYear: year,
      },
    });

    res.json({ message: 'Vote submitted successfully', vote });
  } catch (err) {
    res.status(400).json({ error: 'User has already voted for this year' });
  }
};

// GET /results/:year

exports.getElectionResults = async (req, res) => {
  const year = parseInt(req.params.year);

  const election = await prisma.election.findUnique({
    where: { year },
    include: {
      candidates: {
        include: {
          _count: {
            select: { votes: true }
          }
        }
      }
    }
  });

  if (!election) return res.status(404).json({ error: 'Election not found' });

  const results = election.candidates.map(candidate => ({
    id: candidate.id,
    name: candidate.name,
    isWinner: candidate.isWinner,
    remarks: candidate.remarks,
    voteCount: candidate._count.votes,
  }));

  res.json({ year, results });
};


