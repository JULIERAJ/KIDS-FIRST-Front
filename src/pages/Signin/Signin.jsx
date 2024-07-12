import { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

import { login, loginFacebook, loginSocial } from '@api';
import Header from '@components/shared/Header';
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import FormEmailInput from '@components/shared/ui/form/FormEmailInput';
import FormPasswordInput from '@components/shared/ui/form/FormPasswordInput';
import SocialLoginButton from '@components/shared/ui/SocialLoginButton/SocialLoginButton';

import { EMAIL_REG_EXP } from '@utils/regexPatterns';

import styles from './Signin.module.css';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMesasage, setErrorMesasage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMesasage('');
    // console.log('Email:', email);
    // console.log('Password:', password);
    // console.log('Remember Me:', rememberMe);

    if (validateEmail) {
      login(email, password)
        .then((res) => {
          const { token, ...userData } = res.data;
          // Store the token in localStorage
          localStorage.setItem('authToken', token);
  
          // Store the remaining user data in sessionStorage or localStorage based on rememberMe
          const user = JSON.stringify(userData);
          if (rememberMe) {
            localStorage.setItem('storedUser', user);
          } else {
            sessionStorage.setItem('storedUser', user);
          }
          navigate('/dashboard');
        })
        .catch(({ response }) => {
          if (response.status === 404) {
            setErrorMesasage(
              'This account doesn\'t exist. Please enter a different email address or try "Sign Up".'
            );
          } else if (response.status === 401) {
            setErrorMesasage('Invalid password or email address');
          } else {
            setErrorMesasage(
              'An unknown error occurred. Please try again later.'
            );
          }
        });
    }
  };
  // Function to validate email format
  const validateEmail = (emailValue) => {
    return EMAIL_REG_EXP.test(emailValue);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFacebookLoginSuccess = (response) => {
    loginFacebook(response.data.accessToken, response.data.userID)
      .then((res) => {
        const { token, ...userData } = res.data;
        // Store the token in localStorage
        localStorage.setItem('authToken', token);

        // Store the remaining user data in sessionStorage or localStorage based on rememberMe
        const user = JSON.stringify(userData);
        if (rememberMe) {
          localStorage.setItem('storedUser', user);
        } else {
          sessionStorage.setItem('storedUser', user);
        }
        navigate('/dashboard');
      })
      .catch(() => {
        setErrorMesasage(
          'Your email address or password is incorrect. Please try again, or click "Forgot your password"'
        );
      });
  };

  const loginfromGoogle = (response) => {
    loginSocial(response.data.access_token, response.data.email)
      .then((res) => {
        const { token, ...userData } = res.data;
        // Store the token in localStorage
        localStorage.setItem('authToken', token);

        // Store the remaining user data in sessionStorage or localStorage based on rememberMe
        const user = JSON.stringify(userData);
        if (rememberMe) {
          localStorage.setItem('storedUser', user);
        } else {
          sessionStorage.setItem('storedUser', user);
        }
        navigate('/dashboard');
        // eslint-disable-next-line
        console.groupCollapsed(response.data);
      })
      .catch(() => {
        setErrorMesasage(
          'Log-in unsuccessful. Please try again later, or sign-up.'
        );
      });
  };

  return (
    <>
      <Container className={styles.page}>
        <Header className={styles.header} />
        <Container className={styles.page__window}>
          <Row>
            <Col className={styles.page__wrapper}>
              <h1 className={styles.login__title}>
                    Welcome back to Kids First{' '}
              </h1>
              <Form className={`py-4 ${styles.form}`} onSubmit={handleLogin} noValidate >
                <FormEmailInput
                  autoComplete='off'
                  required
                  onChange={handleEmailChange}
                  defaultValue={email}
                  isInvalid={emailError}
                  errors={emailError}
                  labelClassName={styles.label}
                />

                <FormPasswordInput
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                  errors={errorMesasage}
                  labelClassName={styles.label}
                />
                <div className={styles.container}>
                  <div className={styles.checkboxContainer}>
                    <input
                      className={styles.checkboxInput}
                      type='checkbox'
                      value='remember-me'
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className={styles.checkboxLabel}>
                      {' '}
                          Remember me
                    </label>
                  </div>
                  <div>
                    <NavLink
                      className={styles.forgetPasswordLabel}
                      to='/forgot-password'
                    >
                          Forgot your password?
                    </NavLink>
                  </div>
                </div>
                <CustomButton
                  styles={`primary-light ${styles.customButton}`}
                  type='submit'>
                      Log In
                </CustomButton>
                <div className={styles.orDivider}>
                  <span className={styles.dashLine}></span>
                  <span className={`${styles.orText}`}>Or</span>
                  <span className={styles.dashLine}></span>
                </div>
                <Row className={styles.socialButton}>
                  <Col xs={12} md={6}>
                    <SocialLoginButton
                      provider='google'
                      onSuccess={loginfromGoogle}
                      /* eslint-disable no-console */
                      onFailure={(err) => console.log(err)}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <SocialLoginButton
                      provider='facebook'
                      onSuccess={handleFacebookLoginSuccess}
                      /* eslint-disable no-console */
                      onFailure={(error) => console.log(error)}
                    />
                  </Col>
                </Row>
                <Row className='justify-content-center'>
                  <div className={styles.alreadyMember}>
                        Not a member?
                    <NavLink className={styles.registerLink} to='/register'>
                          Sign up
                    </NavLink>
                  </div>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
