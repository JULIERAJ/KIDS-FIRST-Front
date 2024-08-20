import { useCallback, useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { resetPassword, resetPasswordLink } from '@api';
import Header from '@components/shared/Header';
import NotificationPage from '@components/shared/NotificationPage';
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import FormPasswordInput from '@components/shared/ui/form/FormPasswordInput';

import emailImage from '@media/icons/email-image.svg';
import { validatePassword } from '@utils/validationUtils';

import styles from './ResetPassword.module.css';

const DEFAULT_MESSAGE =
  'Include at least: • 8 characters  • upper and lower case characters  • a number  • a special character';

export default function ResetPassword() {
  const { email, resetPasswordToken } = useParams();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [initialFocus, setInitialFocus] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTextPaswsord, setShowTextPassword] = useState('');
  const [linkExpired, setLinkExpired] = useState(false);
  const [allPasswordErrorsChecked, setAllPasswordErrorsChecked] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verifyEmail();
  }, [email, resetPasswordToken]);

  const verifyEmail = async () => {
    try {
      await resetPasswordLink(email, resetPasswordToken);
    } catch (err) {
      //eslint-disable-next-line no-console
      console.error(err);
      setLinkExpired(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;

    setPassword(passwordValue);
    setShowTextPassword('');

    validatePassword(
      passwordValue,
      setErrorMessage,
      setAllPasswordErrorsChecked,
      setSuccessMessage
    );
  };

  const handleFocus = () => {
    if (!initialFocus && !allPasswordErrorsChecked) {
      setShowTextPassword(DEFAULT_MESSAGE);
      setInitialFocus(true);
    }
  };

  const handleBlur = (e) => {
    setShowTextPassword('');
    validatePassword(
      e.target.value,
      setErrorMessage,
      setAllPasswordErrorsChecked,
      setSuccessMessage
    );
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!password.trim()) {
        setErrorMessage('Please enter your password.');
        return;
      } else {
        setErrorMessage('');
      }

      try {
        await resetPassword(email, password, resetPasswordToken);

        navigate('/password-changed');
      } catch (err) {
        if (err.response.status === 400) {
          setErrorMessage(err.response.data.message);
        } else {
          console.error(err);
          setLinkExpired(true);
        }
      }
    },
    [email, password, resetPasswordToken]
  );

  return linkExpired ? (
    <NotificationPage
      title='Link Expired'
      image={emailImage}
      altText='link-expired-icon'
      message='This password reset link is no longer valid'
      description='Please request a new password reset link to continue.'
      linkText='Back to Forgot Password'
      linkTo='/forgot-password'
    />
  ) : (
    <Container className={styles.page}>
      <Header />
      <Container className={styles['page-window']}>
        <Container className={`${styles['page-wrapper']}`}>
          <h1 className={styles.title}>Set a New Password</h1>
          <p className={styles.description}>
            Please create a new password, making sure it differs from any
            previous passwords you have used.
          </p>
          <Form onSubmit={handleSubmit} noValidate>
            <FormPasswordInput
              required
              value={password}
              label='New Password'
              labelClassName={styles.label}
              isInvalid={!!errorMessage}
              errors={errorMessage}
              successMessage={successMessage}
              showTextPassword={showTextPaswsord}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              onChange={handlePasswordChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ paddingBottom: '0' }}
            />
            <CustomButton
              styles={`primary-light ${styles['button-size']}`}
              type='submit'
            >
              Next
            </CustomButton>
          </Form>
          <NavLink className={styles.link} to='/signin'>
            Back to Log In
          </NavLink>
        </Container>
      </Container>
    </Container>
  );
}
