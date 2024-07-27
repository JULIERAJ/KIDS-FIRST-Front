import PropTypes from 'prop-types';

import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate , NavLink } from 'react-router-dom';

import Header from '@components/shared/Header';

import { CustomButton } from '../ui/Button/CustomButton';

import styles from './NotificationPage.module.css';

export default function NotificationPage({ title, image, altText, message, description, linkText, linkTo, isButton }) {
  const navigate = useNavigate();

  return (
    <Container className={styles.page}>
      <Header />
      <Container className={styles['page-window']}>
        <Container className={`${styles['page-wrapper']}`}>
          <h1 className={styles.title}>{title}</h1>
          {image && <img className={styles.loadingLogo} src={image} alt={altText} />}
          <h2 className={styles.subtitle}>{message}</h2>
          <p className={styles.description}>{description}</p>
          {isButton ? (
            <div className={styles['custom-button-container']}>
              <CustomButton
                className={`primary-light ${styles['custom-button']}`}
                size="med"
                variant="light"
                onClick={() => navigate(linkTo)}
              >
                {linkText}
              </CustomButton>
            </div>
          ) : (
            <NavLink className={styles.link} to={linkTo}>
              {linkText}
            </NavLink>
          )}
        </Container>
      </Container>
    </Container>
  );
}

NotificationPage.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  altText: PropTypes.string,
  message: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  isButton: PropTypes.bool
};
