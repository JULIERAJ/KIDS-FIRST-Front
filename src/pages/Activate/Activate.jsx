import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { activate } from '@api';

import NotificationPage from '@components/shared/NotificationPage';
import emailImage from '@media/icons/email-image.svg';

const Activate = () => {
  const params = useParams();
  let { email, emailVerificationToken } = params;

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await activate(email, emailVerificationToken);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === 'jwt expired'
        ) {
          setExpired(true);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [email, emailVerificationToken]);

  if (loading) {
    return (
      <NotificationPage
        title="Loading..."
        image={null}
        altText=""
        message="Please wait while we verify your email"
        description=""
        linkText="Back to Home"
        linkTo="/"
      />
    );
  }

  if (userData.emailIsActivated) {
    return (
      <NotificationPage
        title="Email verified"
        image={emailImage}
        altText="email-verified-icon"
        message="Thank you for verifying your email address!"
        description="Please click 'Next' to proceed to the login page."
        linkText="Next"
        linkTo="/signin"
        isButton={true}
      />
    );
  }

  if (expired) {
    return (
      <NotificationPage
        title="Link Expired"
        image={emailImage}
        altText="link-expired-icon"
        message="This verification link is no longer valid"
        description={`Please check ${email} for the latest verification email to continue.`}
        linkText="Back to Sign up"
        linkTo="/register"
      />
    );
  }

  return (
    <NotificationPage
      title="Something went wrong!"
      image={emailImage}
      altText="something-went-wrong-icon"
      message="Verification was unsuccessful"
      description="Please sign up again to receive a new link."
      linkText="Back to Sign up"
      linkTo="/register"
    />
  );
};

export default Activate;
