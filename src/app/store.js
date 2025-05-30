
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import campaignReducer from '../features/campaigns/campaignSlice';
import donationReducer from '../features/donations/donationSlice'; // you can keep this if you want extra slice logic, optional
import adminReducer from '../features/admin/adminSlice';

import { donationApi } from '../features/donations/donationAPI'; // adjust path if needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
    campaigns: campaignReducer,
    donations: donationReducer, // optional: keep if you have additional donation state
    admin: adminReducer,
    [donationApi.reducerPath]: donationApi.reducer, // add RTK Query reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(donationApi.middleware), // add RTK Query middleware
});

