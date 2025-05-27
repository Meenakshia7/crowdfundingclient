import apiClient from '../../utils/apiClient';

export const register = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await apiClient.post('/auth/login', userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await apiClient.get('/auth/profile');
  return response.data;
};
