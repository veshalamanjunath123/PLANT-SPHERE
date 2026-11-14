import axios from 'axios';
import { MOCK_CATEGORIES, queryMockProducts, getMockProductById } from './mockData';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const isHttpsPage = typeof window !== 'undefined' && window.location.protocol === 'https:';
const isLocalBackend = !rawBaseUrl || rawBaseUrl.includes('localhost') || rawBaseUrl.includes('127.0.0.1');
const shouldDirectlyUseFallback = isHttpsPage && isLocalBackend;

/**
 * Centralized Axios client for communicating with the Spring Boot backend
 * with seamless offline-resilient fallback to the local botanical collection.
 */
const axiosClient = axios.create({
  baseURL: rawBaseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function resolveMock(url, params) {
  const cleanUrl = (url || '').replace(/^[a-zA-Z]+:\/\/[^/]+/, '');
  const [pathname, queryString] = cleanUrl.split('?');

  if (pathname.includes('/categories')) {
    return MOCK_CATEGORIES;
  }

  const productMatch = pathname.match(/\/products\/(\d+)/);
  if (productMatch) {
    return getMockProductById(productMatch[1]);
  }

  if (pathname.includes('/products')) {
    return queryMockProducts(params || {}, queryString || '');
  }

  return null;
}

// Interceptor for attaching auth token & handling HTTPS mixed content fallback
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('plant_sphere_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (shouldDirectlyUseFallback) {
      const mock = resolveMock(config.url, config.params);
      if (mock) {
        config.adapter = () =>
          Promise.resolve({
            data: mock,
            status: 200,
            statusText: 'OK (Botanical Offline Store)',
            headers: {},
            config,
          });
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: graceful fallback if backend server is offline or returns error
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config;
    if (config) {
      const mock = resolveMock(config.url, config.params);
      if (mock) {
        console.info('Backend unreachable, serving specimen catalog from fallback nursery store.');
        return Promise.resolve({
          data: mock,
          status: 200,
          statusText: 'OK (Fallback)',
          headers: {},
          config,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
