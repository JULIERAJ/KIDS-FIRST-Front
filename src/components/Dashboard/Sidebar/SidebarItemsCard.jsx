import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Album } from '@media/icons/album.svg';
import { ReactComponent as Calendar } from '@media/icons/calendar.svg';
import { ReactComponent as Chat } from '@media/icons/chat.svg';
import { ReactComponent as Face } from '@media/icons/face.svg';
import { ReactComponent as Help } from '@media/icons/help.svg';
import { ReactComponent as Home } from '@media/icons/home.svg';
import { ReactComponent as Logout } from '@media/icons/logout.svg';

import styles from './Sidebar.module.css';

const SidebarItemsCard = ({ title, iconPath, path, onClick, isActive }) => {
  const iconChooser = () => {
    switch (iconPath) {
    case 'album':
      return (
        <Album
          className={`${styles.icon} ${isActive ? styles.active : ''}`}
        />
      );
    case 'calendar':
      return (
        <Calendar
          className={`${styles.icon} ${isActive ? styles.active : ''}`}
        />
      );
    case 'chat':
      return (
        <Chat className={`${styles.icon} ${isActive ? styles.active : ''}`} />
      );
    case 'face':
      return (
        <Face className={`${styles.icon} ${isActive ? styles.active : ''}`} />
      );
    case 'help':
      return <Help className={`${styles.icon} ${isActive ? styles.active : ''}`} />;
    case 'home':
      return <Home className={`${styles.icon} ${isActive ? styles.active : ''}`} />;
    case 'logout':
      return (
        <Logout
          className={`${styles.icon} ${isActive ? styles.active : ''}`}
        />
      );
    }
  };

  const handleClick = () => {
    onClick(title, path);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  return (
    <NavLink
      to={path}
      className={`${styles.nav} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    > 
      {iconChooser()}
      <span>{title}</span>
    </NavLink>
  );
};

SidebarItemsCard.propTypes = {
  title: PropTypes.string.isRequired,
  iconPath: PropTypes.node.isRequired,
  path: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default SidebarItemsCard;
