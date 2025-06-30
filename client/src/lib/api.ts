const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'API request failed');
    }

    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error');
  }
}

// Election APIs
export async function getElections() {
  return apiRequest<any[]>('/api/elections');
}

export async function getElectionResults(year: number) {
  return apiRequest<{ year: number; results: any[] }>(`/vote/results/${year}`);
}

// Voting APIs
export async function submitVote(userId: number, candidateId: number) {
  return apiRequest<{ message: string; vote: any }>('/vote/submit', {
    method: 'POST',
    body: JSON.stringify({ userId, candidateId }),
  });
}

// Auth APIs
export async function signIn(email: string, password: string) {
  return apiRequest<{ token: string; user: any }>('/api/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function signUp(userData: {
  name: string;
  email: string;
  phone: string;
  password: string;
  batchYear: number;
}) {
  return apiRequest<{ message: string }>('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function verifyOtp(phone: string, otp: string) {
  return apiRequest<{ message: string }>('/api/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ phone, otp }),
  });
} 