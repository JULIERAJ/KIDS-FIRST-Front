import PropTypes from 'prop-types';
import React from 'react';

import styles from './ErrorPage.module.css';

const ErrorPage = ({ message }) => {
  return (
    <div className={styles['error-container']}>
      <h2 className={styles['error-message']}>{message}</h2>
    </div>
  );
};

ErrorPage.propTypes = {
  message: PropTypes.string
};

export default ErrorPage;
