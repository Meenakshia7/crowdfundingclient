
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const donationApi = createApi({
  reducerPath: 'donationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/donations',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.user?.token || getState().auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Donations'],
  endpoints: (builder) => ({
    // Create donation (mutation)
    createDonation: builder.mutation({
      query: (donationData) => ({
        url: '/',
        method: 'POST',
        body: donationData,
      }),
      invalidatesTags: ['Donations'],
    }),

    // Get donations by campaign ID
    getDonationsByCampaign: builder.query({
      query: (campaignId) => `campaign/${campaignId}`,
      providesTags: (result, error, campaignId) => [
        { type: 'Donations', id: `campaign-${campaignId}` },
      ],
    }),

    // Get donations by user ID
    getDonationsByUser: builder.query({
      query: (userId) => `user/${userId}`,
      providesTags: (result, error, userId) => [
        { type: 'Donations', id: `user-${userId}` },
      ],
    }),

    // [OPTIONAL/ADMIN] Get all donations
    getAllDonations: builder.query({
      query: () => '/',
      providesTags: [{ type: 'Donations' }],
    }),
  }),
});

// Auto-generated hooks
export const {
  useCreateDonationMutation,
  useGetDonationsByCampaignQuery,
  useGetDonationsByUserQuery,
  useGetAllDonationsQuery,
} = donationApi;
