import axios from 'axios';

// Use different base URLs for development vs production
const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000/api' 
  : '/api';

export const getItems = async () => {
  const { data } = await axios.get(`${API_BASE}/items`);
  return data;
};

export const createItem = async (item) => {
  const { data } = await axios.post(`${API_BASE}/items`, item);
  return data;
};