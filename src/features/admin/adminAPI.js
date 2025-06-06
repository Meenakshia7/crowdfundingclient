
import apiClient from '../../utils/apiClient';

const adminAPI = {
  // ===== User Management APIs =====
  getAllUsers: () => apiClient.get('/admin/users'),
  getUserById: (id) => apiClient.get(`/admin/users/${id}`),
  updateUser: (id, data) => apiClient.put(`/admin/users/${id}`, data),
  deleteUser: (id) => apiClient.delete(`/admin/users/${id}`),

  // ===== System Stats =====
  getSystemStats: (token) =>
    apiClient.get('/admin/stats', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // ===== Campaign Management =====
  getPendingCampaigns: (token) =>
    apiClient.get('/admin/campaigns/pending', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getCampaignsByStatus: (status, token) =>
    apiClient.get(`/admin/campaigns/status/${status}`, {
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
        'Content-Type': 'multipart/form-data',
      },
    }),

  deleteCampaign: (id, token) =>
    apiClient.delete(`/admin/campaigns/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default adminAPI;
