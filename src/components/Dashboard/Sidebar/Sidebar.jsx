import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import kidsFirstLogo from '@media/logo/LOGO-BYME.png';

import styles from './Sidebar.module.css';
import { SIDEBAR_DATA } from './sidebarData';

const SidebarItemsCard = ({ title, icon, activeIcon, hoverIcon, path, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isActive) {
      navigate(path);
    }
  }, [isActive, path, navigate]);

  const handleClick = (e) => {
    e.preventDefault();
    onClick(title, path);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
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
      {isActive ? activeIcon : (isHovered ? hoverIcon : icon)}
      <span className={styles.sidebarMenuItem}>{title}</span>
    </Nav.Item>
  );
};

SidebarItemsCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
  hoverIcon: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Sidebar = ({ onTitleChange }) => {
  const [activeLink, setActiveLink] = useState(null);

  const handleTitleChange = (title, path) => {
    setActiveLink(path);
    onTitleChange(title);
  };

  const settingsHelpItems = SIDEBAR_DATA.filter(item => item.title === 'Help' || item.title === 'Settings');
  const otherItems = SIDEBAR_DATA.filter(item => item.title !== 'Help' && item.title !== 'Settings');

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <div className={`${styles.sidebar} no-gutter`}>
        <Container as='div' className={styles.sidebarHeader}>
          <Image src={kidsFirstLogo} alt='mainLogo' />
        </Container>
        <div className={styles.sidebarMenu}>
          <div className={styles.otherItemsContainer}>
            {otherItems.map((item, key) => (
              <SidebarItemsCard
                key={key}
                {...item}
                isActive={item.path === activeLink}
                onClick={handleTitleChange}
              />
            ))}
          </div>
          <div className={styles.settingsHelpContainer}>
            {settingsHelpItems.map((item, key) => (
              <SidebarItemsCard
                key={key}
                {...item}
                isActive={item.path === activeLink}
                onClick={handleTitleChange}
              />
            ))}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

Sidebar.propTypes = {
  onTitleChange: PropTypes.func.isRequired,
};

export default Sidebar;
