
// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, confirmPassword }, thunkAPI) => {
    try {
      if (password !== confirmPassword) {
        return thunkAPI.rejectWithValue('Passwords do not match');
      }
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
        confirmPassword,
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

// NEW: Forgot Password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email, newPassword }, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/forgot-password', {
        email,
        newPassword,
      });
      return response.data; // probably { message: 'Password reset successfully' }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Password reset failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Forgot password cases
      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // we don’t set user here, only show success message
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectIsLoggedIn = (state) => !!state.auth.user;
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';
export default authSlice.reducer;
