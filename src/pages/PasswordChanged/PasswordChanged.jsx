import { NavLink } from 'react-router-dom';

import logoPswdChanged from '@media/icons/pswd-changed.svg';

import styles from './PasswordChanged.module.css';

export default function PasswordChanged() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Password Changed</h1>
        <img
          className={styles.loadingLogo}
          src={logoPswdChanged}
          alt='password-changed-successfully'
        />
        <h2 className={styles.subTitle}>Password has been updated!</h2>
        <p className={styles.description}>
          You can now log in with the new password.{' '}
        </p>
        <NavLink className={styles.link} to='/signin'>
          Back To Log In
        </NavLink>
      </div>
    </div>
  );
}
