import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { activate } from '@api';

import NotificationPage from '@components/shared/NotificationPage';
import emailImage from '@media/icons/email-image.svg';

const Activate = () => {
  const params = useParams();
  let { email, emailVerificationToken } = params;

  const [loading, setLoading] = useState(true);
  const [linkExpired, setLinkExpired] = useState(false);
  const [linkInvalid, setLinkInvalid] = useState(false);
  const [verificationSuccessful, setVerificationSuccessful] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await activate(email, emailVerificationToken);
        if (data.emailIsActivated) {
          setVerificationSuccessful(true);
        }
        setLoading(false);
      } catch (error) {
        //console.log('Error:', error.response.data.message);
        //console.log('Error:', error.response.status);
        if (error.response.status === 400) {
          setLinkExpired(true);
        }
        setLinkInvalid(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [email, emailVerificationToken]);

  if (loading) {
    return (
      <NotificationPage
        title='Loading...'
        image={emailImage}
        altText=''
        message='Something went wrong'
        description=''
        linkText='Back to Home'
        linkTo='/'
      />
    );
  }

  if (verificationSuccessful) {
    return (
      <NotificationPage
        title='Email verified'
        image={emailImage}
        altText='email-verified-icon'
        message='Thank you for verifying your email address!'
        description="Please click 'Next' to proceed to the login page."
        linkText='Next'
        linkTo='/signin'
        isButton={true}
      />
    );
  }

  if (linkExpired) {
    return (
      <NotificationPage
        title='Link Expired'
        image={emailImage}
        altText='link-expired-icon'
        message='This verification link is no longer valid'
        description={`Please check ${email} for the latest verification email to continue.`}
        linkText='Back to Sign up'
        linkTo='/register'
      />
    );
  }

  if (linkInvalid) {
    return (
      <NotificationPage
        title='Something went wrong!'
        image={emailImage}
        altText='something-went-wrong-icon'
        message='Verification was unsuccessful'
        description='Please sign up again to receive a new link.'
        linkText='Back to Sign up'
        linkTo='/register'
      />
    );
  }
  return null;
};

export default Activate;
