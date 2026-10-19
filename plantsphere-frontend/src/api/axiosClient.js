import axios from 'axios';

/**
 * Centralized Axios client for communicating with the Spring Boot backend.
 * Reads the base URL from Vite environment variables.
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for attaching auth token (configured for Phase 4)
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('plant_sphere_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;