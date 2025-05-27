import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as dashboardAPI from './dashboardAPI';

export const fetchDashboard = createAsyncThunk(
  'dashboard/fetchDashboard',
  async (_, thunkAPI) => {
    try {
      const data = await dashboardAPI.getDashboardData();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Failed to load dashboard');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;



