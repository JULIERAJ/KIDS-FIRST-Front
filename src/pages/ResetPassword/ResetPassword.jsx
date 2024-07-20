import { useCallback, useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { resetPassword, resetPasswordLink } from '@api';

// import MessageBar from '@components/MessageBar';

//import FatherSonBlock from '@components/shared/FatherSonBlock';
//import Header from '@components/shared/Header';
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import FormPasswordInput from '@components/shared/ui/form/FormPasswordInput';
//import TextLink from '@components/shared/ui/TextLink';
// import logoPswdChanged from '@media/icons/pswd-changed.png';

import styles from './ResetPassword.module.css';

const DEFAULT_MESSAGE =
  'Include at least: • 8 characters  • upper and lower case characters  • a number  • a special character';

export default function ResetPassword() {
  const { email, resetPasswordToken } = useParams();
  const [userValid, setUserValid] = useState(null);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [defaultMessage, setDefaultMessage] = useState('');
  // const [showPassword, setShowPassword] = useState(false);
  // const [sentEmail, setSentEmail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verifyEmail();
  }, [email, resetPasswordToken]);

  const verifyEmail = async () => {
    try {
      const { data } = await resetPasswordLink(email, resetPasswordToken);
      setUserValid(data);
    } catch (err) {
      //eslint-disable-next-line no-console
      console.error(err);
    }
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword((prev) => !prev);
  // };

  const handleChangePassword = useCallback(
    async (e) => {
      e.preventDefault();

      if (password === '') {
        setErrorMessage(DEFAULT_MESSAGE);
        return;
      } else {
        setErrorMessage('');
      }

      try {
        const { data } = await resetPassword(
          email,
          password,
          resetPasswordToken
        );
        setUserValid(data);
        setSuccessMessage('Password accepted');
        // setSentEmail(true);
        navigate('/password-changed');
      } catch (err) {
        setErrorMessage(DEFAULT_MESSAGE);
      }
    },
    [email, password, resetPasswordToken]
  );

  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Set a New Password</h1>
        <p className={styles.description}>
          Please create a new password, making sure it differs from any previous
          passwords you have used
        </p>

        {userValid && (
          <Form onSubmit={handleChangePassword} noValidate>
            <FormPasswordInput
              required
              value={password}
              label='New Password'
              labelClassName={styles.label}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='off'
              errors={errorMessage}
              successMessage={successMessage}
              showTextPassword={defaultMessage}
              onFocus={() =>
                !errorMessage &&
                !successMessage &&
                setDefaultMessage(DEFAULT_MESSAGE)
              }
              onBlur={() => setDefaultMessage('')}
              style={{ paddingBottom: '0px' }}
            />
            <CustomButton
              styles='primary-light'
              style={{ margin:'56px 0px 48px 0px', width: '442px', height: '56px' }}
              type='submit'
            >
              Change Password
            </CustomButton>
          </Form>
        )}

        <NavLink className={styles.forgetPasswordLabel} to='/forgot-password'>
          Forgot your password?
        </NavLink>
      </Container>
    </div>
  );
}
