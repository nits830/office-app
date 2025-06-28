const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getResultsForYear(year) {
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

  if (!election) {
    console.log(`❌ No election found for year ${year}`);
    return;
  }

  const totalVotes = election.candidates.reduce(
    (sum, c) => sum + c._count.votes,
    0
  );

  if (totalVotes === 0) {
    console.log(`📊 No votes cast for election ${year}`);
    return;
  }

  // Find winner
  let winner = election.candidates[0];
  for (const candidate of election.candidates) {
    if (candidate._count.votes > winner._count.votes) {
      winner = candidate;
    }
  }

  // Show results
  console.log(`📊 Election Results for ${year} (Total Votes: ${totalVotes})`);
  console.log('----------------------------------------------------');

  election.candidates.forEach((candidate) => {
    const voteCount = candidate._count.votes;
    const percentage = ((voteCount / totalVotes) * 100).toFixed(2);

    const isWinner = candidate.id === winner.id ? '🏆 Winner' : '';
    console.log(`${candidate.name}: ${voteCount} votes (${percentage}%) ${isWinner}`);
  });

  console.log('----------------------------------------------------');
  console.log(`✅ Winner: ${winner.name} with ${winner._count.votes} votes`);
}

// Run for 2025
getResultsForYear(2025);
