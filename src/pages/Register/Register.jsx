import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { register } from '@api';

import Header from '@components/shared/Header';

import EmailVerify from './EmailVerify';
import styles from './Register.module.css';
import RegisterForm from './RegisterForm';

const Register = () => {
  const params = useParams();
  let paramEmail = params.email;

  const [userData, setUserData] = useState({});
  const [activeComponent, setActiveComponent] = useState(true);

  const [errorMsg, setErrorMsg] = useState('');

  const registerUserHandler = async (firstName, lastName, email, password) => {
    try {
      const { data } = await register({ firstName, lastName, email, password });
      setUserData(data);
      localStorage.setItem('storedUser', data);
      setActiveComponent(false);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <>
      <Container className={styles.page}>
        <Header className={styles.header} />
        <Container className={styles.page__window}>
          <Row>
            <Col className={styles.page__wrapper}>
              <h1 className={styles.page__title}>Welcome to Kids First</h1>
              {activeComponent ? (
                <RegisterForm
                  onSubmitData={registerUserHandler}
                  paramEmail={paramEmail}
                  errorMsg={errorMsg}
                />
              ) : (
                <EmailVerify userData={userData} />
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Register;
