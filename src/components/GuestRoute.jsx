// src/components/GuestRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuestRoute = () => {
  const user = useSelector((state) => state.auth.user);

  // If user is logged in, redirect to dashboard
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default GuestRoute;
