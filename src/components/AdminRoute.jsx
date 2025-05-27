
// src/components/AdminRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAdmin, selectIsLoggedIn } from '../features/auth/authSlice';

const AdminRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);

  if (!isLoggedIn) {
    // Not logged in → redirect to login
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    // Logged in but not admin → redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // Admin → allow access
  return <Outlet />;
};

export default AdminRoute;

