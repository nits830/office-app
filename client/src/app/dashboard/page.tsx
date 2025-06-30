'use client';

import { useState, useEffect } from 'react';
import VoteCard from '@/components/VoteCard';
import ElectionResults from '@/components/ElectionResults';
import { getElections, submitVote, getElectionResults } from '@/lib/api';
import { Election, ElectionResult } from '@/types';

export default function Dashboard() {
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [results, setResults] = useState<ElectionResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const data = await getElections();
      setElections(data);
      if (data.length > 0) {
        setSelectedElection(data[0]);
        fetchResults(data[0].year);
      }
    } catch (error) {
      console.error('Error fetching elections:', error);
      setMessage('Failed to load elections');
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async (year: number) => {
    try {
      const data = await getElectionResults(year);
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleVote = async (candidateId: number) => {
    if (!selectedElection) return;
    
    setVoting(true);
    setMessage('');
    
    try {
      // For demo purposes, using a hardcoded userId
      // In a real app, this would come from authentication context
      const userId = 1;
      
      await submitVote(userId, candidateId);
      setMessage('Vote submitted successfully!');
      
      // Refresh results
      await fetchResults(selectedElection.year);
    } catch (error: any) {
      setMessage(error.message || 'Failed to submit vote');
    } finally {
      setVoting(false);
    }
  };

  const handleElectionChange = (election: Election) => {
    setSelectedElection(election);
    fetchResults(election.year);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
          <p className="mt-2 text-gray-600">Cast your vote and view election results</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Election Selector */}
        {elections.length > 0 && (
          <div className="mb-8">
            <label htmlFor="election-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Election
            </label>
            <select
              id="election-select"
              value={selectedElection?.id || ''}
              onChange={(e) => {
                const election = elections.find(emp => emp.id === parseInt(e.target.value));
                if (election) handleElectionChange(election);
              }}
              className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {elections.map((election) => (
                <option key={election.id} value={election.id}>
                  {election.year} Election
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Voting Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cast Your Vote</h2>
            {selectedElection ? (
              <VoteCard
                election={selectedElection}
                onVote={handleVote}
                voting={voting}
              />
            ) : (
              <p className="text-gray-500">No elections available</p>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Election Results</h2>
            {selectedElection ? (
              <ElectionResults
                results={results}
                year={selectedElection.year}
              />
            ) : (
              <p className="text-gray-500">No results available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 