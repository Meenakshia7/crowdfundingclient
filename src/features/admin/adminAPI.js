

import apiClient from '../../utils/apiClient';

const adminAPI = {
  // Existing User Management APIs (no token needed here, assumed handled by interceptor)
  getAllUsers: () => apiClient.get('/admin/users'),
  getUserById: (id) => apiClient.get(`/admin/users/${id}`),
  updateUser: (id, data) => apiClient.put(`/admin/users/${id}`, data),
  deleteUser: (id) => apiClient.delete(`/admin/users/${id}`),

  // System Stats
  getSystemStats: () => apiClient.get('/admin/stats'),

  // Campaign Management — all need auth token in headers, so accept token param
  getPendingCampaigns: (token) =>
    apiClient.get('/admin/campaigns/pending', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  approveCampaign: (id, token) =>
    apiClient.put(`/admin/campaigns/${id}/approve`, null, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  rejectCampaign: (id, token) =>
    apiClient.put(`/admin/campaigns/${id}/reject`, null, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateCampaign: (id, data, token) =>
    apiClient.put(`/admin/campaigns/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // if sending form data with image upload
      },
    }),
};

export default adminAPI;
