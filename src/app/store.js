
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import campaignReducer from '../features/campaigns/campaignSlice';
import donationReducer from '../features/donations/donationSlice';
import adminReducer from '../features/admin/adminSlice';

import { donationApi } from '../features/donations/donationAPI'; // RTK Query API slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    campaigns: campaignReducer,
    donations: donationReducer, // ✅ keep if you use local donation state (besides RTK Query)
    admin: adminReducer,
    [donationApi.reducerPath]: donationApi.reducer, // ✅ integrates RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(donationApi.middleware), // ✅ attaches RTK Query middleware
  devTools: process.env.NODE_ENV !== 'production', // ✅ enables Redux DevTools only in dev
});
