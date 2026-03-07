import axios from 'axios';

// Use different base URLs for development vs production
const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000/api' 
  : '/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE,
});

// Request interceptor to add JWT token to all requests
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

export const getItems = async () => {
  const { data } = await api.get('/items');
  return data;
};

export const createItem = async (item) => {
  const { data } = await api.post('/items', item);
  return data;
};

export const getRoles = async () => {
  const { data } = await api.get('/roles');
  return data;
};

export const createRole = async (roleData) => {
  const { data } = await api.post('/roles', {
    roleName: roleData.roleName,
    roleDescription: roleData.roleDescription,
    rolesIsActive: roleData.rolesIsActive
  });
  console.log('API response from createRole:', data);
  return data;
};

export const updateRole = async (roleId, roleData) => {
  const { data } = await api.put(`/roles/${roleId}`, roleData);
  return data;
};

export const deleteRole = async (roleId) => {
  const { data } = await api.delete(`/roles/${roleId}`);
  return data;
};


