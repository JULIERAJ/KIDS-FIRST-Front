import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';

import { resendEmailVerification } from '@api';

import NotificationPage from '@components/shared/NotificationPage';

import envelopeImg from '@media/icons/email-image.svg';

import EventModal from '../../components/Dashboard/Calendar/KFCalendar/EventModal/EventModal';

const EmailVerify = ({ userData }) => {
  const email = userData.email;
  const [isLoading, setIsLoading] = useState(false);
  const [emailResent, setEmailResent] = useState(false);
  const [message, setMessage] = useState('Verify your email');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const MAX_TIME = 10;//2 min
  const time = useRef(MAX_TIME);

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
        setEmailResent(true);
        // popup

        // setMessage('Email resent successfully');
        // setEmailResent(true); // Update the state to indicate that email has been resent
      } else {
        // navigate to error page

        setMessage('Error resending email. Please try again later.');
        // console.error('Error resending email. Response:', response);

      }
    } catch (error) {
      // navigate to error page

      // setMessage('Error resending email. Please try again later.');
      // console.error('Error resending email:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <NotificationPage title='Sign up Kids First'
        image={envelopeImg}
        altText="Envelope icon"
        message={message}
        description={`An email with a verification link was sent to ${email}. Please verify your email address.`}
        text="If you haven't received the email within 2 minutes, you can resend the verification link one more time."
        linkText="Resend verification link"
        linkTo="#"
        isButton={true}
        isLoading={isLoading}
        emailResent={emailResent}
        handleResendEmail={handleResendEmail}
        isActive={isActive}>

      </NotificationPage>
      {isModalOpen && <EventModal onClose={closeModal} />}
    </>
    // <>
    //   <FeedbackBlock message={message} image={envelopeImg}/>
    //   <div className={styles.verifyText}>
    //     <p>A verification email has been sent to {email}.</p>
    //     <p>Please verify your email address to log in to KIDS FIRST.</p>

  //   </div>
  //   <div className={styles.resendEmailLink}>
  //     {/* Disable the link and show loading indicator if isLoading is true or email has already been resent*/}
  //     {!emailResent && (
  //     /* eslint-disable-next-line */
  //       <a href='' onClick={handleResendEmail} disabled={isLoading}>
  //         {isLoading ? 'Resending...' : 'Resend Email'}
  //       </a>
  //     )}
  //     {emailResent && (
  //       <p>Email already resent</p>
  //     )}
  //   </div>
  // </>
  );
};

EmailVerify.propTypes = {
  userData: PropTypes.object
};
export default EmailVerify; 
