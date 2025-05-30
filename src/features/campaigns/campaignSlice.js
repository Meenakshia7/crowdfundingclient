


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import campaignAPI from './campaignAPI';

// // Async thunks
// export const fetchCampaigns = createAsyncThunk(
//   'campaigns/fetchCampaigns',
//   async () => {
//     const response = await campaignAPI.getCampaigns();
//     return response.data;
//   }
// );

// export const fetchUserCampaigns = createAsyncThunk(
//   'campaigns/fetchUserCampaigns',
//   async () => {
//     const response = await campaignAPI.getUserCampaigns();
//     return response.data;
//   }
// );

// export const fetchCampaignById = createAsyncThunk(
//   'campaigns/fetchCampaignById',
//   async (id) => {
//     const response = await campaignAPI.getCampaignById(id);
//     return response.data;
//   }
// );

// export const createCampaign = createAsyncThunk(
//   'campaigns/createCampaign',
//   async (campaignData) => {
//     const response = await campaignAPI.createCampaign(campaignData);
//     return response.data;
//   }
// );

// export const updateCampaign = createAsyncThunk(
//   'campaigns/updateCampaign',
//   async ({ id, campaignData }) => {
//     const response = await campaignAPI.updateCampaign(id, campaignData);
//     return response.data;
//   }
// );

// export const deleteCampaign = createAsyncThunk(
//   'campaigns/deleteCampaign',
//   async (id) => {
//     await campaignAPI.deleteCampaign(id);
//     return id;
//   }
// );

// const campaignSlice = createSlice({
//   name: 'campaigns',
//   initialState: {
//     campaigns: [],
//     userCampaigns: [],        // 🔥 new: campaigns owned by the user
//     currentCampaign: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     clearCurrentCampaign(state) {
//       state.currentCampaign = null;
//     },
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(fetchCampaigns.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCampaigns.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.campaigns = action.payload;
//       })
//       .addCase(fetchCampaigns.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
      
//       .addCase(fetchUserCampaigns.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUserCampaigns.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.userCampaigns = action.payload;   // 🔥 store user’s campaigns
//       })
//       .addCase(fetchUserCampaigns.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })

//       .addCase(fetchCampaignById.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCampaignById.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.currentCampaign = action.payload;
//       })
//       .addCase(fetchCampaignById.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(createCampaign.fulfilled, (state, action) => {
//         state.campaigns.push(action.payload);
//         state.userCampaigns.push(action.payload);   // 🔥 add to user list too
//       })
//       .addCase(updateCampaign.fulfilled, (state, action) => {
//         const index = state.campaigns.findIndex(c => c._id === action.payload._id);
//         if (index !== -1) {
//           state.campaigns[index] = action.payload;
//         }

//         const userIndex = state.userCampaigns.findIndex(c => c._id === action.payload._id);
//         if (userIndex !== -1) {
//           state.userCampaigns[userIndex] = action.payload;
//         }
//       })
//       .addCase(deleteCampaign.fulfilled, (state, action) => {
//         state.campaigns = state.campaigns.filter(c => c._id !== action.payload);
//         state.userCampaigns = state.userCampaigns.filter(c => c._id !== action.payload);
//       });
//   },
// });

// export const { clearCurrentCampaign } = campaignSlice.actions;

// export default campaignSlice.reducer;






import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import campaignAPI from './campaignAPI';

// ──────────────────────────────────────────────
// Async Thunks
// ──────────────────────────────────────────────

export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchCampaigns',
  async () => {
    const response = await campaignAPI.getCampaigns();
    return response.data;
  }
);

export const fetchUserCampaigns = createAsyncThunk(
  'campaigns/fetchUserCampaigns',
  async () => {
    const response = await campaignAPI.getUserCampaigns();
    return response.data;
  }
);

export const fetchCampaignById = createAsyncThunk(
  'campaigns/fetchCampaignById',
  async (id) => {
    const response = await campaignAPI.getCampaignById(id);
    return response.data;
  }
);

export const createCampaign = createAsyncThunk(
  'campaigns/createCampaign',
  async (campaignData) => {
    const response = await campaignAPI.createCampaign(campaignData);
    return response.data;
  }
);

export const updateCampaign = createAsyncThunk(
  'campaigns/updateCampaign',
  async ({ id, campaignData }) => {
    const response = await campaignAPI.updateCampaign(id, campaignData);
    return response.data;
  }
);

export const deleteCampaign = createAsyncThunk(
  'campaigns/deleteCampaign',
  async (id) => {
    await campaignAPI.deleteCampaign(id);
    return id; // return the deleted campaign id
  }
);

// ──────────────────────────────────────────────
// Slice
// ──────────────────────────────────────────────

const initialState = {
  campaigns: [],
  userCampaigns: [],
  currentCampaign: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    clearCurrentCampaign(state) {
      state.currentCampaign = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Fetch all campaigns
      .addCase(fetchCampaigns.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.campaigns = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch user’s campaigns
      .addCase(fetchUserCampaigns.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserCampaigns.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userCampaigns = action.payload;
      })
      .addCase(fetchUserCampaigns.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch single campaign by ID
      .addCase(fetchCampaignById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCampaignById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentCampaign = action.payload;
      })
      .addCase(fetchCampaignById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Create campaign
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.campaigns.push(action.payload);
        state.userCampaigns.push(action.payload);
      })

      // Update campaign
      .addCase(updateCampaign.fulfilled, (state, action) => {
        const updated = action.payload;

        state.campaigns = state.campaigns.map((c) =>
          c._id === updated._id ? updated : c
        );
        state.userCampaigns = state.userCampaigns.map((c) =>
          c._id === updated._id ? updated : c
        );
      })

      // Delete campaign
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.campaigns = state.campaigns.filter((c) => c._id !== deletedId);
        state.userCampaigns = state.userCampaigns.filter((c) => c._id !== deletedId);
      });
  },
});

export const { clearCurrentCampaign } = campaignSlice.actions;

export default campaignSlice.reducer;
