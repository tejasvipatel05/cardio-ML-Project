// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005/api';

export const api = {
  baseURL: API_BASE_URL,
  endpoints: {
    health: `${API_BASE_URL}/health`,
    predict: `${API_BASE_URL}/predict`,
    assessment: `${API_BASE_URL}/assessment`,
    report: `${API_BASE_URL}/report`,
  },
};

export default api;