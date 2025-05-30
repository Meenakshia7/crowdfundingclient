import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch donations by campaign
export const fetchDonationsByCampaign = createAsyncThunk(
  'donations/fetchByCampaign',
  async (campaignId, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/donations/campaign/${campaignId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch donations'
      );
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
