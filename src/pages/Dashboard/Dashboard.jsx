import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardHeader from '@components/Dashboard/DashboardHeader/DashboardHeader';
import Sidebar from '@components/Dashboard/Sidebar/Sidebar';

// import CustomButton from '@components/shared/ui/Button/CustomButton';
// import addIcon from '@components/shared/ui/Icon/add.svg';

import { useAuth } from '@context/AuthContext';

import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [title, setTitle] = useState('Dashboard');
  const { user } = useAuth();
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  return (
    <div className={styles.dashboard}>
      <Sidebar onTitleChange={handleTitleChange} />
      <div className={styles.content}>
        <DashboardHeader title={title} user={user} />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
