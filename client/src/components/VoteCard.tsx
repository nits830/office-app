'use client';

import { useState } from 'react';

interface Candidate {
  id: number;
  name: string;
  isWinner: boolean;
  remarks?: string;
}

interface Election {
  id: number;
  year: number;
  startTime: string;
  endTime: string;
  candidates: Candidate[];
}

interface VoteCardProps {
  election: Election;
  onVote: (candidateId: number) => void;
  voting: boolean;
}

export default function VoteCard({ election, onVote, voting }: VoteCardProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);

  const isVotingOpen = () => {
    const now = new Date();
    const startTime = new Date(election.startTime);
    const endTime = new Date(election.endTime);
    return now >= startTime && now <= endTime;
  };

  const handleVote = () => {
    if (selectedCandidate && !voting) {
      onVote(selectedCandidate);
    }
  };

  const votingStatus = isVotingOpen() ? (
    <div className="flex items-center text-green-600 mb-4">
      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
      <span className="text-sm font-medium">Voting is open</span>
    </div>
  ) : (
    <div className="flex items-center text-red-600 mb-4">
      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
      <span className="text-sm font-medium">Voting is closed</span>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Election Info */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900">
          {election.year} Election
        </h3>
        <div className="text-sm text-blue-700 mt-1">
          <p>Start: {new Date(election.startTime).toLocaleDateString()}</p>
          <p>End: {new Date(election.endTime).toLocaleDateString()}</p>
        </div>
        {votingStatus}
      </div>

      {/* Candidates */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Candidates</h4>
        {election.candidates.length === 0 ? (
          <p className="text-gray-500 text-sm">No candidates available</p>
        ) : (
          election.candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedCandidate === candidate.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="candidate"
                    value={candidate.id}
                    checked={selectedCandidate === candidate.id}
                    onChange={() => setSelectedCandidate(candidate.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <h5 className="font-medium text-gray-900">{candidate.name}</h5>
                    {candidate.remarks && (
                      <p className="text-sm text-gray-600 mt-1">{candidate.remarks}</p>
                    )}
                  </div>
                </div>
                {candidate.isWinner && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Winner
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Vote Button */}
      {isVotingOpen() && (
        <button
          onClick={handleVote}
          disabled={!selectedCandidate || voting}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            selectedCandidate && !voting
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {voting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting Vote...
            </div>
          ) : (
            'Submit Vote'
          )}
        </button>
      )}

      {!isVotingOpen() && (
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">
            Voting period has ended for this election
          </p>
        </div>
      )}
    </div>
  );
} 