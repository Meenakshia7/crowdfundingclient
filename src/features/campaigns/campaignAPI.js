

import apiClient from '../../utils/apiClient';

const campaignAPI = {
  // Get all public (active) campaigns
  getCampaigns: () => apiClient.get('/campaigns'),

  // Get a single campaign by ID
  getCampaignById: (id) => apiClient.get(`/campaigns/${id}`),

  // Create a new campaign (requires auth)
  // If `data` is a FormData instance, set content-type to multipart/form-data
  createCampaign: (data) => {
    const headers = data instanceof FormData
      ? { 'Content-Type': 'multipart/form-data' }
      : {};
    return apiClient.post('/campaigns', data, { headers });
  },

  // Update an existing campaign (requires auth)
  updateCampaign: (id, data) => {
    const headers = data instanceof FormData
      ? { 'Content-Type': 'multipart/form-data' }
      : {};
    return apiClient.put(`/campaigns/${id}`, data, { headers });
  },

  // Delete a campaign (requires auth)
  deleteCampaign: (id) => apiClient.delete(`/campaigns/${id}`),

  // 🆕 Get campaigns created by the logged-in user
  getUserCampaigns: () => apiClient.get('/campaigns/my'),
};

export default campaignAPI;



