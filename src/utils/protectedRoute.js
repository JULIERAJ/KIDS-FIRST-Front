import React from 'react';
import {
  Navigate,
  Outlet
} from 'react-router-dom';

import { useAuth } from '@context/AuthContext';

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedRoute;
