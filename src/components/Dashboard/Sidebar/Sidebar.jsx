import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { logout } from '@api';
import kidsFirstLogo from '@media/logo/LOGO-BYME.png';

import styles from './Sidebar.module.css';
import { SIDEBAR_DATA } from './sidebarData';

const SidebarItemsCard = ({
  title,
  icon,
  activeIcon,
  hoverIcon,
  path,
  isActive,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isActive) {
      navigate(path);
    }
  }, [isActive, path, navigate]);

  const handleClick = (e) => {
    e.preventDefault();
    onClick(path);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <>
      <Nav.Item
        className={`${styles.nav} ${isActive ? styles.active : ''}`}
        id={window.location.pathname === path ? 'active' : ''}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {isActive ? activeIcon : isHovered ? hoverIcon : icon}
        <span className={`${styles.sidebarMenuItem}`}>{title}</span>
      </Nav.Item>
    </>
  );
};

const Sidebar = ({ setTitle }) => {
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();

  const handleClick = (path, title) => {
    if (title === 'Logout') {
      handleLogout();
    } else {
      setActiveLink(path);
      setTitle(title);
    }
  };

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        // Token not found in local storage, handle accordingly (possibly already logged out)
        return navigate('/signin');
      }

      const response = await logout(authToken);

      if (response.status === 200) {
        // Clear local storage upon successful logout
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('storedUser');
        navigate('/signin');
      } else {
        console.error('Logout failed:', response.data.error);
        // Handle error response (e.g., unauthorized logout attempt)
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
        <div className={`${styles.sidebarMenu}`}>
          {/* Render div for all other items */}
          <div className={styles.otherItemsContainer}>
            {otherItems.map((item, key) => (
              <SidebarItemsCard
                key={key}
                {...item}
                isActive={item.path === activeLink}
                onClick={() => handleClick(item.path, item.title)}
              />
            ))}
          </div>

          {/* Render div for "Help" and "Logout" items */}
          <div className={styles.HelpLogoutContainer}>
            {HelpLogoutItems.map((item, key) => (
              <SidebarItemsCard
                key={key}
                {...item}
                isActive={item.path === activeLink}
                onClick={() => handleClick(item.path, item.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

SidebarItemsCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
  hoverIcon: PropTypes.node.isRequired,
  path: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

Sidebar.propTypes = {
  setTitle: PropTypes.func,
};

export default Sidebar;
