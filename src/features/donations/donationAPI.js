import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const donationApi = createApi({
  reducerPath: 'donationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/donations',
    prepareHeaders: (headers, { getState }) => {
      // Attach JWT token from Redux state if present
      const token = getState().auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Donations'],
  endpoints: (builder) => ({
    createDonation: builder.mutation({
      query: (donationData) => ({
        url: '/',
        method: 'POST',
        body: donationData,
      }),
      invalidatesTags: ['Donations'],
    }),
    getDonationsByCampaign: builder.query({
      query: (campaignId) => `campaign/${campaignId}`,
      providesTags: ['Donations'],
    }),
    getDonationsByUser: builder.query({
      query: (userId) => `user/${userId}`,
      providesTags: ['Donations'],
    }),
    getAllDonations: builder.query({
      query: () => '/',
      providesTags: ['Donations'],
    }),
  }),
});

export const {
  useCreateDonationMutation,
  useGetDonationsByCampaignQuery,
  useGetDonationsByUserQuery,
  useGetAllDonationsQuery,
} = donationApi;
