import { useCallback, useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { resetPassword, resetPasswordLink } from '@api';

import MessageBar from '@components/MessageBar';

import FatherSonBlock from '@components/shared/FatherSonBlock';
import Header from '@components/shared/Header';
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import FormPasswordInput from '@components/shared/ui/form/FormPasswordInput';
import TextLink from '@components/shared/ui/TextLink';
import logoPswdChanged from '@media/icons/pswd-changed.png';

import styles from './ResetPassword.module.css';

const DEFAULT_ERROR_MESSAGE =
  'You are using symbols in your passwords or your passwords do not match.';

export default function ResetPassword() {
  const { email, resetPasswordToken } = useParams();
  const [userValid, setUserValid] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sentEmail, setSentEmail] = useState(false);
  const [success, setSuccess] = useState(false);

  const checkValid = useCallback(async () => {
    try {
      const { data } = await resetPasswordLink(email, resetPasswordToken);
      setUserValid(data);
    } catch (err) {
      //eslint-disable-next-line no-console
      console.error(err);
    }
  }, [email, resetPasswordToken]);
  useEffect(() => {
    checkValid();
  }, [checkValid, email, resetPasswordToken]);

  const handleChangePassword = useCallback(
    async (e) => {
      e.preventDefault();
      setErrorMessage('');
      if (password === '' || confirmPassword === '') {
        setErrorMessage('Please fill out both password fields.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
        return;
      }
      try {
        const { data } = await resetPassword(
          email,
          password,
          resetPasswordToken
        );
        setUserValid(data);
        setSuccess(true);
        setSentEmail(true);
      } catch (err) {
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
    },
    [email, password, confirmPassword, resetPasswordToken]
  );

  return (
    <>
      <Header
        widget={
          <TextLink title='Already a member?' to='/signin' linkTitle='Log in' />
        }
      />
      <Container className='content-layout py-4'>
        <FatherSonBlock>
          <h1 className={styles.title}>Change Password</h1>
          {!success && errorMessage && (
            <MessageBar variant='error'>{errorMessage}</MessageBar>
          )}
          {success && sentEmail && (
            <>
              <div className={styles['success-password']}>
                <img
                  className={styles.loadingLogo}
                  src={logoPswdChanged}
                  alt='password-changed-successfully'
                />
                <span>Password has been changed!</span> <br />
                <span>
                  Your password has been changed successfully.
                  <br /> Please login with the new password.
                </span>
                <br />
                <Link to='/signin' className={`btn ${styles['back-login']}`}>
                  Back to Log In
                </Link>
              </div>
            </>
          )}

          {userValid && !sentEmail && (
            <Form className='py-4' onSubmit={handleChangePassword} noValidate>
              <FormPasswordInput
                required
                value={password}
                label='New Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormPasswordInput
                id='confirmPassword'
                label='Password Confirmation'
                name='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <CustomButton
                styles={`primary-btn w-100 my-3 ${styles.customButton}`}
                type='submit'
                size='lg'
                variant='light'>
                Change Password
              </CustomButton>
            </Form>
          )}
        </FatherSonBlock>
      </Container>
    </>
  );
}
