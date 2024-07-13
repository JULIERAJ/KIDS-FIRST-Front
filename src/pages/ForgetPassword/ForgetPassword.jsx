import { useEffect, useRef, useState } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { forgetPassword } from '@api';

import MessageBar from '@components/MessageBar';
import Header from '@components/shared/Header';
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import FormEmailInput from '@components/shared/ui/form/FormEmailInput';
import TextLink from '@components/shared/ui/TextLink';

import logoEmailSent from '@media/icons/email_sent.png';

import styles from './ForgetPassword.module.css';

const HeaderLink = <TextLink title="Not a member?" to="/register" linkTitle="Sign up" />;

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

  const handleResendEmail = async () => {
    setSuccess(false);
    setSentEmail(false);
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
      setErrMsg('An error occurred while resending the email. Please try again later.');
    }
  };

  return (
    <div className={styles.page}>
      <div>
        <Header widget={HeaderLink} />
      </div>
      <Container className={styles.page__window}>
        <div>
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <div>
                <Form
                  className={`content-layout ${styles.page__wrapper}`}
                  onSubmit={handleForgotPassword}>
                  <h1 className={styles.page__title}>Forgot Password</h1>
                  {success && sentEmail ? (
                    <>
                      <div className={styles.success}>
                        <img src={logoEmailSent} alt="email-sent-logo" />
                        <span>Check you email</span>
                        <br />
                        <span>
                          A link to reset your password has been sent to{' '}
                          <strong>{emailDisplay.current}</strong>
                        </span>
                      </div>

                      <Link
                        type="button"
                        className={`btn checkbox mb-3 ${styles.resend__email}`}
                        onClick={() => handleResendEmail()}>
                        Resend Email
                      </Link>
                    </>
                  ) : !success && errMsg ? (
                    <MessageBar variant="error">{errMsg}</MessageBar>
                  ) : null}

                  {success && sentEmail ? null : (
                    <>
                      <p className={styles.text}>
                        Please enter your account email address and we will send instructions to
                        reset your password.
                      </p>
                      <FormEmailInput
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        label="Email"
                        className={styles.input__email}
                      />
                      <CustomButton
                        styles={`primary-btn w-100 my-3 ${styles.customButton}`}
                        type="submit"
                        size="lg"
                        variant="light">
                        Next
                      </CustomButton>
                    </>
                  )}
                  <Link to="/signin" className={`btn checkbox mb-3 ${styles.forget__password}`}>
                    Back to Log in
                  </Link>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
