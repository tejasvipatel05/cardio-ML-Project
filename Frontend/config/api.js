// config/api.js

// Determine the API base URL
let API_BASE_URL;

if (typeof window !== 'undefined') {
  // Client-side - use environment variable
  API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
} else {
  // Server-side - use environment variable
  API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
}

// Log API URL in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  console.log('[API Config] Base URL:', API_BASE_URL);
}

export const api = {
  baseURL: API_BASE_URL,
  endpoints: {
    health: `${API_BASE_URL}/api/health`,
    predict: `${API_BASE_URL}/api/predict`,
    assessment: `${API_BASE_URL}/api/assessment`,
    report: `${API_BASE_URL}/api/report`,
  },
};

export default api;
