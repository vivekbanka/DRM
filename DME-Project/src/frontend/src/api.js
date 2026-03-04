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

export const getRoles = async () => {
  const { data } = await axios.get(`${API_BASE}/roles`);
  return data;
};

export const createRole = async (roleData) => {
  var roleData = {
    roleName: roleData.roleName,
    roleDescription: roleData.roleDescription,
    rolesIsActive: roleData.rolesIsActive
  }
  const { data } = await axios.post(`${API_BASE}/roles`, roleData);
  return data;
}

export const updateRole = async (roleId, roleName, roleDescription, rolesIsActive) => {
  const { data } = await axios.put(`${API_BASE}/roles/${roleId}`, { roleName, roleDescription, rolesIsActive });
  return data;
}

export const deleteRole = async (roleId) => {
  const { data } = await axios.delete(`${API_BASE}/roles/${roleId}`);
  return data;
}


