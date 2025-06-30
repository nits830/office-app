'use client';

import { ElectionResult } from '@/types';

interface ElectionResultsProps {
  results: ElectionResult[];
  year: number;
}

export default function ElectionResults({ results, year }: ElectionResultsProps) {
  const totalVotes = results.reduce((sum, result) => sum + result.voteCount, 0);
  
  // Sort results by vote count (descending)
  const sortedResults = [...results].sort((a, b) => b.voteCount - a.voteCount);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900">
          {year} Election Results
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Total votes cast: {totalVotes}
        </p>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {results.length === 0 ? (
          <p className="text-gray-500 text-sm">No results available yet</p>
        ) : (
          sortedResults.map((result, index) => {
            const percentage = totalVotes > 0 ? (result.voteCount / totalVotes) * 100 : 0;
            
            return (
              <div
                key={result.id}
                className={`border rounded-lg p-4 ${
                  result.isWinner ? 'border-green-200 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{result.name}</h4>
                      {result.remarks && (
                        <p className="text-sm text-gray-600">{result.remarks}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      {result.voteCount}
                    </div>
                    <div className="text-sm text-gray-600">
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      result.isWinner ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                {/* Winner Badge */}
                {result.isWinner && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      🏆 Winner
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* No Results Message */}
      {results.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500">No votes have been cast yet</p>
          <p className="text-sm text-gray-400 mt-1">Results will appear here once voting begins</p>
        </div>
      )}
    </div>
  );
} 