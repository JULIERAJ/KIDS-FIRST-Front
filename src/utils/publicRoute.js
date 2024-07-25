import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Loader from '@components/shared/ui/Loader/Loader';
import { useAuth } from '@context/AuthContext';

const PublicRoute = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <Loader />
    );
  }

  return isLoggedIn ? <Navigate to='/dashboard' /> : <Outlet />;
};

export default PublicRoute;
