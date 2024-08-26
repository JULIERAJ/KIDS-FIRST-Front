import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';

import { resendEmailVerification } from '@api';

import MessageModal from '@components/shared/Modal/MessageModal';
import NotificationPage from '@components/shared/NotificationPage';

import envelopeImg from '@media/icons/email-image.svg';

const EmailVerify = ({ userData }) => {

  const email = userData.email;
  const [isLoading, setIsLoading] = useState(false);
  const [emailResent, setEmailResent] = useState(false);

  const [message, setMessage] = useState('Verify your email');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const [error, setError] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const MAX_TIME = 2 * 60;//2 min
  const time = useRef(MAX_TIME);

  // Delay in resending verification link second time(2 minutes)

  useEffect(() => {

    const interval = setInterval(() => {
      if (time.current > 0) {
        time.current = time.current - 1;
      } else {
        setIsActive(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleResendEmail = async (event) => {
    event.preventDefault();

    if (isLoading || emailResent) return; // Prevent multiple clicks

    setIsLoading(true);

    try {
      const response = await resendEmailVerification(email);

      if (response.status === 200) {

        openModal();
        setMessage('Email resent successfully');

        setEmailResent(true);
      }
      else {

        setError(true);

      }
    } catch (error) {

      setError(true);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error ? (
        <NotificationPage
          title="Loading..."
          image={envelopeImg}
          altText=""
          message="Something went wrong"
          description=""
          linkText="Back to Home"
          isButton={false}
          linkTo="/"
        />
      ) : (
        <>
          <NotificationPage title='Sign up Kids First'
            image={envelopeImg}
            altText="Envelope icon"
            message={message}
            description={`An email with a verification link was sent to ${email}. Please verify your email address.`}
            text="If you haven't received the email within 2 minutes, 
            you can resend the verification link one more time."
            linkText="Resend verification link"
            linkTo="#"
            isButton={true}
            isLoading={isLoading}
            emailResent={emailResent}
            handleResendEmail={handleResendEmail}
            isActive={isActive} />

          {isModalOpen && (
            <MessageModal onClose={closeModal} text={`Verification link has been successfully resent to ${email}`} />
          )}
        </>
      )
      }
    </>
  );
};

EmailVerify.propTypes = {
  userData: PropTypes.object
};
export default EmailVerify; 
