import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import styles from './Sidebar.module.css';

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
      {isActive ? activeIcon : isHovered ? hoverIcon : icon}
      <span className={styles.sidebarMenuItem}>{title}</span>
    </Nav.Item>
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

export default SidebarItemsCard;
