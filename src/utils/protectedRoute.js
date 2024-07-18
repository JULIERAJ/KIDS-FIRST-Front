
import React, { useContext } from 'react';
import { Outlet , Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (isLoggedIn)? <Outlet /> : <Navigate to='/Signin'/>;
};

export default ProtectedRoute;
