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
        {/* <div className={styles.pagewindow}>
          <h1 className={styles.title}>
            Create your kid’s profile and add all the necessary information by
            clicking Add Your Kid button.
          </h1>
          <CustomButton
            styles={`${styles['custom-button']} secondary-light`}
            //styles='secondary-light'
            iconRight={addIcon}
            // iconRight='/path/to/icon/add.svg' // Ensure this path is correct
            iconRightStyles='icon-right-style'
            textStyles='text-style'
          >
            Add your kid
          </CustomButton>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
