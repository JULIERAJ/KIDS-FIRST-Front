import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('storedUser') || localStorage.getItem('storedUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        sessionStorage.removeItem('storedUser');
        localStorage.removeItem('storedUser');
      }
    }
    setLoading(false); 
  }, []); 

  const login = (userData, rememberMe = false) => {
    setIsLoggedIn(true);
    setUser(userData);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('storedUser', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem('storedUser');
    localStorage.removeItem('storedUser');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
