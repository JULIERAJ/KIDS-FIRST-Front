import PropTypes from 'prop-types';

import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Header from '@components/shared/Header';

import { NavButton } from '../ui/Button/NavButton';

import styles from './NotificationPage.module.css';

export default function NotificationPage({ title,
  image,
  altText,
  message,
  description,
  text,
  linkText,
  linkTo,
  isButton,
  isLoading,
  emailResent,
  isActive,
  handleResendEmail }) {

  const handleClick = (event) => {
    event.preventDefault();
    if (!isLoading && !emailResent && isActive) {
      handleResendEmail(event);
    }
  };

  return (
    <Container className={styles.page}>
      <Header />
      <Container className={styles['page-window']}>
        <Container className={styles['page-wrapper']}>
          <h2 className={styles.title}>{title}</h2>
          {image && <img className={styles['loading-logo']} src={image} alt={altText} />}
          <h3 className={styles.subtitle}>{message}</h3>
          <p className={styles.description}>{description}</p>
          <p className={styles.text}>{text}</p>
          {isButton ? (
            <div className={styles['button-container']}>
              <NavButton
                className={`${styles['nav-button']}`}
                onClick={handleClick}
                disabled={isLoading || !isActive || emailResent}
              >

                {isLoading ? 'Resending...' : linkText}

              </NavButton>
            </div>
          ) : (
            <NavLink className={styles.link} to={linkTo}>
              {linkText}
            </NavLink>
          )}
          {/* {isButton ? (
            !emailResent ? (
              <div className={styles['button-container']}>
                <NavButton
                  className={`${styles['nav-button']}`}
                  onClick={handleClick}
                  disabled={isLoading || !isActive || emailResent}
                >

                  {isLoading ? 'Resending...' : linkText}

                </NavButton>
              </div>
            ) : (<p className={styles['resend-status']}>Email already resent</p>)
          ) : (
            <NavLink className={styles.link} to={linkTo}>
              {linkText}
            </NavLink>
          )} */}
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
  text: PropTypes.string,
  linkText: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  isButton: PropTypes.bool,
  isLoading: PropTypes.bool,
  emailResent: PropTypes.bool,
  isActive: PropTypes.bool,
  handleResendEmail: PropTypes.func,
};
