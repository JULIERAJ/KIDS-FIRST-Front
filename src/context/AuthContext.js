import Cookies from 'js-cookie';
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        Cookies.remove('user');
        setIsLoggedIn(false);
        setUser(null);
        setError('Session data corrupted, please log in again.');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, rememberMe = false) => {
    setIsLoggedIn(true);
    setUser(userData);
    const COOKIE_EXPIRATION_REMEMBER_ME = parseInt(process.env.REACT_APP_COOKIE_EXPIRATION_REMEMBER_ME, 10) || 30;
    const COOKIE_EXPIRATION_DEFAULT = parseInt(process.env.REACT_APP_COOKIE_EXPIRATION_DEFAULT, 10) || 1;
    const expires = rememberMe ? COOKIE_EXPIRATION_REMEMBER_ME : COOKIE_EXPIRATION_DEFAULT;
    Cookies.set('user', JSON.stringify(userData), { expires });
    setError(null); 
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    Cookies.remove('user');
    setError(null); 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
