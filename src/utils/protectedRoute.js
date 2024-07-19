import React from 'react';
import {
  Navigate,
  Outlet
} from 'react-router-dom';

import Loader from '@components/shared/ui/Loader/Loader';
import { useAuth } from '@context/AuthContext';

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <Loader />
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedRoute;
