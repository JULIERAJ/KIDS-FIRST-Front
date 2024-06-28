import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../Footer';
import Header from '../Header';
import Navigation from '../Navigation';

import styles from './LandingLayout.module.css';

const LandingLayout = () => {
  return (
    <>
      <header className={styles.big__header}>
        <Header widget={
          <Navigation />
        } />
      </header>
      <Outlet />  
      <Footer />
    </>
  );
};

export default LandingLayout;
