import PropTypes from 'prop-types';
import React from 'react';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';

import facebookIcon from '@media/icons/facebook.svg';
import googleIcon from '@media/icons/google.svg';

import styles from './SocialLoginButton.module.css';

const SocialLoginButton = ({ provider, onSuccess, onFailure }) => {
  const renderButton = () => {
    switch (provider) {
    case 'google':
      return (
        <LoginSocialGoogle
          client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
          onResolve={onSuccess}
          onReject={onFailure}
        >
          <div className={styles.button}>
            <img src={googleIcon} alt='Google icon' /> 
            <span className={`${styles.text} ${styles['larger-spacing']}`}>Google</span>
          </div>
        </LoginSocialGoogle>
      );
    case 'facebook':
      return (
        <LoginSocialFacebook
          appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
          onResolve={onSuccess}
          onReject={onFailure}
        >
          <div className={styles.button}>
            <img src={facebookIcon} alt='Facebook icon' /> 
            <span className={`${styles.text} ${styles['smaller-spacing']}`}>Facebook</span>
          </div>
        </LoginSocialFacebook>
      );
    default:
      return null;
    }
  };

  return <>{renderButton()}</>;
};

SocialLoginButton.propTypes = {
  provider: PropTypes.oneOf(['google', 'facebook']).isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
};

export default SocialLoginButton;
