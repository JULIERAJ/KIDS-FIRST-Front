import React, { createContext, useState, useEffect } from 'react';

import { checkAuth } from '@api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
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
    
    if (window.location.pathname.startsWith('/dashboard')) {
      checkAuthStatus();
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout , user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
