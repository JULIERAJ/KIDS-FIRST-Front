import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate, useParams } from 'react-router-dom';

import { activate } from '../../api';
import FatherSonBlock from '../../components/shared/FatherSonBlock';
import FeedbackBlock from '../../components/shared/Feedback/FeedbackBlock';
import Header from '../../components/shared/Header';
import TextLink from '../../components/shared/ui/TextLink';
import SuccessImg from '../../media/icons/pswd-changed.png';

import styles from './Activate.module.css';

const Activate = () => {
  const params = useParams();
  const navigate = useNavigate();
  let { email, emailVerificationToken } = params;

  // States to manage user data, loading status, and link expiration
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  // Function to handle navigation to sign-in page
  const handleClick = () => {
    navigate('/signin');
  };

  // Function to fetch user data and check for link expiration
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await activate(email, emailVerificationToken);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        // Check if the link has expired
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

  return (
    <>
      <Header
        widget={
          <TextLink title='Already a member?' to='/signin' linkTitle='Log in' />
        }
      />
      <Container className='content-layout py-4'>
        <FatherSonBlock>
          <h1 className={styles.registerTitle}>Sign up Kids First</h1>

          {/* Show loading message while fetching data */}
          {loading && <p>Loading...</p>}

          {/* Show success message if email is activated */}
          {!loading && userData.emailIsActivated && (
            <>
              <FeedbackBlock message={userData.message} image={SuccessImg} />
              <div className={styles.text}>
                <p> Your email address has been verified</p>
                <p>To proceed, click next</p>
              </div>
              <div>
                <Button
                  className={`primary-btn w-100 my-3 ${styles.customButton}`}
                  type='submit'
                  size='lg'
                  variant='light'
                  onClick={handleClick}>
                  Log In
                </Button>
              </div>
            </>
          )}
          {!loading && !userData.emailIsActivated && expired && (
            <div>
              <p>The link was expired</p>
            </div>
          )}
          {!loading && !userData.emailIsActivated && !expired && (
            <div>
              <p>Something went wrong</p>
            </div>
          )}
        </FatherSonBlock>
      </Container>
    </>
  );
};

export default Activate;
