import React from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '@api';

import { useAuth } from '@context/AuthContext';

import { ReactComponent as LogoutIcon } from '@media/icons/logout.svg';

import styles from './Sidebar.module.css'; // Reuse the Sidebar styles

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout: authContextLogout } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        authContextLogout();
        navigate('/signin');
      } else {
        console.error('Logout failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      <LogoutIcon className={styles.icon} />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
