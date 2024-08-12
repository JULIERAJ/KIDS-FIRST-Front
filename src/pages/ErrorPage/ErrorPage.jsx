import React from 'react';

import { Container } from 'react-bootstrap';

import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <Container className={styles.page}>
      <Container className={styles['page-window']}>
        <Container className={styles['page-wrapper']}>
          <h2 className={styles['error-message']}>Ops! Something went wrong. Please try again later</h2>
        </Container>
      </Container>
    </Container>
  );
};

export default ErrorPage;
