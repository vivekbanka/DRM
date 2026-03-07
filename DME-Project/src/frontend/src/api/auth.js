import axios from 'axios';

// Use different base URLs for development vs production
const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000/api' 
  : '/api';

// Create axios instance for auth endpoints
const api = axios.create({
  baseURL: API_BASE,
});

// Request interceptor to add JWT token to all requests (except login/register)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', {
    email,
    password
  });
  return data;
};

export const register = async (email, password, firstName, lastName) => {
  const { data } = await api.post('/auth/register', {
    email,
    password,
    firstName,
    lastName,
    companyId: 1
  });
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};
