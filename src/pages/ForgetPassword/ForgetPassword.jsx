import { useEffect, useRef, useState } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { forgetPassword } from '@api';

import MessageBar from '@components/MessageBar';
import Header from '@components/shared/Header';
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import FormEmailInput from '@components/shared/ui/form/FormEmailInput';

import logoEmailSent from '@media/icons/email_sent.png';

import styles from './ForgetPassword.module.css';

export default function ForgetPassword() {
  const emailDisplay = useRef('');
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);

  useEffect(() => {
    emailDisplay.current = email;
  }, [email]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setErrMsg('');
    try {
      const res = await forgetPassword(email);
      if (res.status === 200) {
        setEmail('');
        setSentEmail(true);
        setSuccess(true);
      } else {
        setErrMsg(res.message);
      }
    } catch (err) {
      //eslint-disable-next-line
      console.error(err);
      setErrMsg('There was an error with the request, please try again later.');
    }
  };

  return (
    <Container className={styles.page}>
      <Header />
      <Container className={styles['page-window']}>
        <div>
          <Row>
            <Col className="d-flex px-0 justify-content-center align-items-center">
              <div>
                <Form
                  className={`content-layout ${styles['page-wrapper']}`}
                  onSubmit={handleForgotPassword}>
                  <></>
                  <h2 className={styles['page-title']}>Forgot Password</h2>
                  {success && sentEmail ? (
                    <section className={styles.success}>
                      <img className={styles['success-icon']} src={logoEmailSent} alt="email-sent-icon" />
                      <h3 className={styles['success-heading']}>Check you email</h3>

                      <span className={styles['success-text']}>
                        A link to reset your password has been sent to{' '}
                        <strong>{emailDisplay.current}</strong>
                      </span>
                    </section>

                  ) : !success && errMsg ? (
                    <MessageBar variant="error">{errMsg}</MessageBar>
                  ) : null}

                  {success && sentEmail ? null : (
                    <section className={styles.reset}>
                      <p className={styles['reset-text']}>
                        Please enter your account email address and we will send instructions to
                        reset your password.
                      </p>
                      <FormEmailInput
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        label="Email"
                        className={styles['reset-input']}
                      />
                      <CustomButton
                        styles={`primary-light ${styles['reset-custom-button']}`}
                        type="submit"
                        size="lg"
                        variant="light">
                        Next
                      </CustomButton>
                    </section>
                  )}
                  <NavLink to="/signin" className={styles['page-link']}>
                    Back to Log in
                  </NavLink>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
}
