import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Container, Image, Navbar } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import kidsFirstLogo from '@media/logo/LOGO-BYME.svg';

import LogoutButton from './LogoutButton'; // Import the new LogoutButton component
import styles from './Sidebar.module.css';
import { SIDEBAR_DATA } from './sidebarData';
import SidebarItemsCard from './SidebarItemsCard';

const Sidebar = ({ onTitleChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    const currentItem =SIDEBAR_DATA.find(item => item.path === location.pathname);
    if(currentItem) {
      setActiveLink(location.pathname);
      onTitleChange(currentItem.title);
    }
  },[location.pathname, onTitleChange]);

  const handleClick = (title, path) => {
    setActiveLink(path);
    onTitleChange(title);
    navigate(path);
  };

  // Separate sidebar items into two arrays: one for "Help" and one for others
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
                onClick={() => handleClick(item.title, item.path)}
              />
            ))}
          </div>

          <div className={styles.helpLogoutContainer}>
            {HelpLogoutItems.map((item, key) => (
              item.title === 'Logout' ? (
                <LogoutButton key={key} />
              ) : (
                <SidebarItemsCard
                  key={key}
                  {...item}
                  isActive={item.path === activeLink}
                  onClick={() => handleClick(item.title, item.path)}
                />
              )
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
