// // src/features/campaigns/campaignAPI.js
// import apiClient from '../../utils/apiClient';

// // Fetch all campaigns
// export const getCampaigns = async () => {
//   const response = await apiClient.get('/campaigns');
//   return response.data;
// };

// // Fetch campaign by ID
// export const getCampaignById = async (id) => {
//   const response = await apiClient.get(`/campaigns/${id}`);
//   return response.data;
// };

// // Create a new campaign
// export const createCampaign = async (data) => {
//   const response = await apiClient.post('/campaigns', data);
//   return response.data;
// };

// // Update an existing campaign
// export const updateCampaign = async (id, data) => {
//   const response = await apiClient.put(`/campaigns/${id}`, data);
//   return response.data;
// };

// // Delete a campaign
// export const deleteCampaign = async (id) => {
//   const response = await apiClient.delete(`/campaigns/${id}`);
//   return response.data;
// };




import apiClient from '../../utils/apiClient';

const campaignAPI = {
  // Get all public (active) campaigns
  getCampaigns: () => apiClient.get('/campaigns'),

  // Get a single campaign by ID
  getCampaignById: (id) => apiClient.get(`/campaigns/${id}`),

  // Create a new campaign (requires auth)
  createCampaign: (data) => apiClient.post('/campaigns', data),

  // Update an existing campaign (requires auth)
  updateCampaign: (id, data) => apiClient.put(`/campaigns/${id}`, data),

  // Delete a campaign (requires auth)
  deleteCampaign: (id) => apiClient.delete(`/campaigns/${id}`),

  // 🆕 Get campaigns created by the logged-in user
  getUserCampaigns: () => apiClient.get('/campaigns/my'),
};

export default campaignAPI;
