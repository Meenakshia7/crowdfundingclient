

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch donations by campaign ID
export const fetchDonationsByCampaign = createAsyncThunk(
  'donations/fetchByCampaign',
  async (campaignId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      // Adjust this based on how you store user token in your auth slice
      const token = state.auth?.user?.token || state.auth?.token;

      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const { data } = await axios.get(
        `/api/donations/campaign/${campaignId}`,
        config
      );

      return data;
    } catch (error) {
      // Defensive error message extraction
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch donations';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const donationSlice = createSlice({
  name: 'donations',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetDonations: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonationsByCampaign.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDonationsByCampaign.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchDonationsByCampaign.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetDonations } = donationSlice.actions;
export default donationSlice.reducer;
