import axios from 'axios';

// Base axios instance (no auth required)
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Factory function to create authenticated axios instance
// Usage: const client = createAuthClient(await getToken())
export const createAuthClient = (token) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};

// For FormData uploads (product images)
export const createAuthClientFormData = (token) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Don't set Content-Type for FormData - browser sets it with boundary
    },
  });
};
