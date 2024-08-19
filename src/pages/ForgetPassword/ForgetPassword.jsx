import { useEffect, useRef, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { object, string } from 'yup';

import { forgetPassword } from '@api';

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

  let formSchema = object({
    email: string().email(),
  });

  useEffect(() => {
    emailDisplay.current = email;
    formSchema
      .validate({ email })
      .then(() => setErrMsg(''))
      .catch((err) => {
        console.log(err);
        setErrMsg('Please enter a valid email address');
      });
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
      setErrMsg('This email is not registered with us');
    }
  };

  return (
    <Container className={styles.page}>
      <Header />
      <Container className={styles['page-window']}>
        <Container className={`${styles['page-wrapper']}`}>
          <div>
            <h2 className={styles['page-title']}>Forgot Password</h2>
            {success && sentEmail && (
              <section className={styles.success}>
                <img
                  className={styles['success-icon']}
                  src={logoEmailSent}
                  alt='email-sent-icon'
                />
                <h3 className={styles['success-heading']}>Check you email</h3>

                <span className={styles['success-text']}>
                  A link to reset your password has been sent to{' '}
                  <strong>{emailDisplay.current}</strong>
                </span>
              </section>
            )}
            {!success && !sentEmail && (
              <Form onSubmit={handleForgotPassword} noValidate>
                <section className={styles.reset}>
                  <p className={styles['reset-text']}>
                    Please enter your account email address and we will send
                    instructions to reset your password.
                  </p>
                  <FormEmailInput
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    label='Email'
                    labelClassName={styles['custom-label']}
                    className={styles['reset-input']}
                    errorMessage={errMsg}
                  />
                  <CustomButton
                    styles={`primary-light ${styles['reset-custom-button']}`}
                    type='submit'
                  >
                    Next
                  </CustomButton>
                </section>
              </Form>
            )}
            <NavLink to='/signin' className={styles['page-link']}>
              Back to Log in
            </NavLink>
          </div>
        </Container>
      </Container>
    </Container>
  );
}
