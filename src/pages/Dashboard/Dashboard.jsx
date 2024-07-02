
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardHeader from '@components/Dashboard/DashboardHeader/DashboardHeader';
import Sidebar from '@components/Dashboard/Sidebar/Sidebar';

import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [title, setTitle] = useState('Dashboard');

  return (
    <div className={styles.dashboard}>
      <Sidebar setTitle={setTitle} />
      <div className={styles.content}>
        <DashboardHeader title={title} />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
