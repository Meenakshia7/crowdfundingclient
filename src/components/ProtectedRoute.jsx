
// src/components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;



