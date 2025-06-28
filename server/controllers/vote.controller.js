const prisma = require('../prisma/client');

exports.submitVote = async (req, res) => {
  const { userId, candidateId } = req.body;

  // 1. Verify user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.isVerified) return res.status(403).json({ error: 'User not verified' });

  // 2. Fetch candidate & election
  const candidate = await prisma.candidate.findUnique({
    where: { id: candidateId },
    include: { election: true },
  });

  if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

  const now = new Date();
  const { startTime, endTime, year } = candidate.election;

  // 3. Check time window
  if (now < startTime || now > endTime) {
    return res.status(400).json({ error: 'Voting is not open for this election' });
  }

  // 4. Enforce one vote per user per year
  try {
    const vote = await prisma.vote.create({
      data: {
        userId,
        candidateId,
        votedYear: year,
      }
    });
    res.json({ message: 'Vote submitted', vote });
  } catch (err) {
    return res.status(400).json({ error: 'User has already voted this year' });
  }
};
 