import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Sidebar.module.css';

const SidebarItemsCard = ({ title, icon, alt, path }) => {
  return (
    <NavLink to={path} className={styles.nav}>
      <span alt={alt} className={'material-symbols-rounded ' + styles.icon}>
        {icon}
      </span>
      <span>{title}</span>
    </NavLink>
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
