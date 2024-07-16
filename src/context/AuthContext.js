import React, { createContext, useState, useEffect } from 'react';

import { checkAuth } from '@api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await checkAuth(); 
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Authentication check failed', error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
