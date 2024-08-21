// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('role'); // Assume role is stored in localStorage after login

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/users/login" />;
  }

  return children;
};

export default ProtectedRoute;
