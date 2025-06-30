export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  batchYear: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Candidate {
  id: number;
  name: string;
  isWinner: boolean;
  remarks?: string;
}

export interface Election {
  id: number;
  year: number;
  startTime: string;
  endTime: string;
  candidates: Candidate[];
}

export interface ElectionResult {
  id: number;
  name: string;
  isWinner: boolean;
  remarks?: string;
  voteCount: number;
}

export interface Vote {
  id: number;
  userId: number;
  candidateId: number;
  votedYear: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
} 