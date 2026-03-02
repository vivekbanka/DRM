import axios from 'axios';

const API_BASE = '/api';

// Set up axios interceptor to include token in headers
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  const { data } = await axios.post(`${API_BASE}/auth/login`, {
    email,
    password
  });
  return data;
};

export const register = async (email, password, firstName, lastName) => {
  const { data } = await axios.post(`${API_BASE}/auth/register`, {
    email,
    password,
    firstName,
    lastName
  });
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axios.get(`${API_BASE}/auth/me`);
  return data;
};
