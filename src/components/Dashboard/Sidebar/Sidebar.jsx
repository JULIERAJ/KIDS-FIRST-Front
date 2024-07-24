import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Container, Image, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { logout } from '@api';
import { useAuth } from '@context/AuthContext';
import kidsFirstLogo from '@media/logo/LOGO-BYME.png';

import styles from './Sidebar.module.css';
import { SIDEBAR_DATA } from './sidebarData';
import SidebarItemsCard from './SidebarItemsCard';

const Sidebar = ({ onTitleChange }) => {
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();
  const { logout: authContextLogout } = useAuth();
  
  const handleClick = (title, path) => {
    if (title === 'Logout') {
      handleLogout();
    } else {
      setActiveLink(path);
      onTitleChange(title);
    }
  };

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
      // Handle network or other errors
    }
  };

  // Separate sidebar items into two arrays: one for "Help" and "Logout", and the other for all others
  const HelpLogoutItems = SIDEBAR_DATA.filter(
    (item) => item.title === 'Help' || item.title === 'Logout'
  );
  const otherItems = SIDEBAR_DATA.filter(
    (item) => item.title !== 'Help' && item.title !== 'Logout'
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <div className={`${styles.sidebar} no-gutter`}>
        <Container as="div" className={styles.sidebarHeader}>
          <Image src={kidsFirstLogo} alt="KIDS FIRST logo displaying two elephants holding a shield with a heart" />
        </Container>
        <div className={styles.sidebarMenu}>
          <div className={styles.otherItemsContainer}>
            {otherItems.map((item, key) => (
              <SidebarItemsCard
                key={key}
                {...item}
                isActive={item.path === activeLink}
                onClick={handleClick}
              />
            ))}
          </div>

          {/* Render div for "Help" and "Logout" items */}
          <div className={styles.helpLogoutContainer}>
            {HelpLogoutItems.map((item, key) => (
              <SidebarItemsCard
                key={key}
                {...item}
                isActive={item.path === activeLink}
                onClick={handleClick}
              />
            ))}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

Sidebar.propTypes = {
  onTitleChange: PropTypes.func,
};

export default Sidebar;
