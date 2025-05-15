import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>...Loading</div>
  }
  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/" replace />;
  }

  // Logged in, render the children components
  return children;
};

export default PrivateRoute;
