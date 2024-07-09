import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login';

import { loginFacebook, loginSocial } from '@api';
import MessageBar from '@components/MessageBar';
import FormEmailInput from '@components/shared/ui/form/FormEmailInput';
import {
  FormFirstNameInput,
  FormLastNameInput,
} from '@components/shared/ui/form/FormNameInput';
import FormPasswordInput from '@components/shared/ui/form/FormPasswordInput';
import facebookIcon from '@media/icons/facebook.png';
import googleIcon from '@media/icons/google.png';

import styles from './Register.module.css';

const regexUpperCase = /[A-Z]/;
const regexLowerCase = /[a-z]/;
const regexNumber = /\d/;
const regexSpecialChar = /[!@#$%^&*()_+=[\]{};':"\\|,.<>?-]/;
const regexLength = /^.{8,40}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterForm = ({ onSubmitData, errorMessage }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errMsgSocial, setErrMsgSocial] = useState('');
  const [successSo, setSuccessSo] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [initialFocus, setInitialFocus] = useState(false);
  const [showTextPassword, setShowTextPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    length: false,
  });
  const [firstNameErrors, setFirstNameErrors] = useState('');
  const [lastNameErrors, setLastNameErrors] = useState('');
  const [allPasswordErrorsChecked, setAllPasswordErrorsChecked] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      setEmailError(errorMessage);
    }
  }, [errorMessage]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const hidePassword = () => {
    setShowPassword(false);
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value.trim();
    let newErrors = '';
    if (!validateName(value)) {
      newErrors = 'Please use only letters';
    } else if (!value) {
      newErrors = 'Please enter your first name';
    }
    setFirstNameErrors(newErrors);
    if (!newErrors) {
      setFirstName(value);
    }
  };

  const validateName = (name) => /^[a-zA-Z]*$/.test(name);

  const handleLastNameChange = (e) => {
    const value = e.target.value.trim();
    let newErrors = '';
    if (!validateName(value)) {
      newErrors = 'Please use only letters';
    }
    setLastNameErrors(newErrors);
    if (!newErrors) {
      setLastName(value);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value.trim();
    setEmail(emailValue);
    if (emailValue === '') {
      setEmailError('Please enter your email address.');
    } else {
      if (!regexEmail.test(emailValue)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowTextPassword('');
  };

  const handleFocus = () => {
    if (!initialFocus && !allPasswordErrorsChecked) {
      setShowTextPassword(
        'Include at least: • 8 characters • upper and lower case characters • a number • a special character'
      );
      setInitialFocus(true);
    }
  };

  const handleBlur = (e) => {
    setShowTextPassword('');
    validatePassword(e.target.value);
  };

  const validatePassword = (passwordValue) => {
    const errors = {
      uppercase: !regexUpperCase.test(passwordValue),
      lowercase: !regexLowerCase.test(passwordValue),
      number: !regexNumber.test(passwordValue),
      special: !regexSpecialChar.test(passwordValue),
      length: !regexLength.test(passwordValue),
    };
    setPasswordErrors(errors);
    const allErrorsResolved = Object.values(errors).every((error) => !error);
    setAllPasswordErrorsChecked(allErrorsResolved);
    setSuccessMessage(allErrorsResolved ? 'Password accepted' : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = [
      {
        value: firstName.trim(),
        errorSetter: setFirstNameErrors,
        placeholder: 'First Name',
      },
      {
        value: email.trim(),
        errorSetter: setEmailError,
        placeholder: 'user@mail.com',
      },
    ];
    let hasEmptyField = false;

    fields.forEach(({ value, errorSetter, placeholder }) => {
      if (value === '' || value === placeholder) {
        errorSetter(`Please enter your ${placeholder.toLowerCase()}`);
        hasEmptyField = true;
      }
    });

    if (!password.trim()) {
      setPasswordErrors({
        uppercase: true,
        lowercase: true,
        number: true,
        special: true,
        length: true,
      });
      hasEmptyField = true;
      return;
    }

    if (hasEmptyField) return;

    if (
      firstNameErrors === '' &&
      lastNameErrors === '' &&
      emailError === '' &&
      allPasswordErrorsChecked
    ) {
      onSubmitData(firstName, lastName, email, password);
    }
  };

  const loginfromGoogle = (response) => {
    setErrMsgSocial('Log-in unsuccessful. Please try again later, or sign-up.');
    loginSocial(response.data.access_token, response.data.email)
      .then((res) => {
        setSuccessSo(true);
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        navigate('/dashboard');
      })
      .catch(() => {
        setSuccessSo(false);
        setErrMsgSocial(
          'Log-in unsuccessful. Please try again later, or sign-up.'
        );
      });
  };

  const handleFacebookLoginSuccess = (response) => {
    loginFacebook(response.data.accessToken, response.data.userID)
      .then((res) => {
        setSuccessSo(true);
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        navigate('/dashboard');
      })
      .catch(() => {
        setSuccessSo(false);
        setErrMsgSocial(
          'Log-in unsuccessful. Please try again later, or sign-up.'
        );
      });
  };

  const errorMessagePassword = Object.entries(passwordErrors)
    // eslint-disable-next-line no-unused-vars
    .filter(([key, value]) => value)
    .map(([key]) => {
      switch (key) {
      case 'uppercase':
      case 'lowercase':
        return 'upper and lower case characters';
      case 'number':
        return 'a number';
      case 'special':
        return 'a special character';
      case 'length':
        return '8 characters';
      default:
        return '';
      }
    })
    .reduce((acc, message) => {
      if (
        message === 'upper and lower case characters' &&
        !acc.includes(message)
      ) {
        acc.push(message);
      } else {
        acc.push(message);
      }
      return acc;
    }, [])
    .join(', ');

  const errorMessageWithInclude = errorMessagePassword
    ? `Include at least: ${errorMessagePassword}`
    : '';

  return (
    <>
      <Form className='py-4' onSubmit={handleSubmit} noValidate>
        <Row className={styles.TextInputField}>
          <Col>
            <FormFirstNameInput
              autoComplete='off'
              required
              onChange={handleFirstNameChange}
              defaultValue={firstName}
              isInvalid={!!firstNameErrors}
              errors={firstNameErrors}
              labelClassName={styles.label}
            />
          </Col>
          <Col>
            <FormLastNameInput
              autoComplete='off'
              required
              onChange={handleLastNameChange}
              defaultValue={lastName}
              isInvalid={!!lastNameErrors}
              errors={lastNameErrors}
              labelClassName={styles.label}
            />
          </Col>
        </Row>
        <FormEmailInput
          autoComplete='off'
          required
          onChange={handleEmailChange}
          defaultValue={email}
          isInvalid={!!emailError}
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
          hidePassword={hidePassword}
          isInvalid={!!errorMessageWithInclude}
          errors={errorMessageWithInclude}
          labelClassName={styles.label}
          successMessage={successMessage}
          onFocus={handleFocus}
          onBlur={handleBlur}
          showTextPassword={showTextPassword}
        />

        {!successSo && <MessageBar variant='error'>{errMsgSocial}</MessageBar>}

        <Button
          className={`primary-btn ${styles.customButton}`}
          type='submit'
          size='lg'
          variant='light'>
          Sign up
        </Button>

        <div className={styles.orDivider}>
          <span className={styles.dashLine}></span>
          <span className={styles.orText}>Or</span>
          <span className={styles.dashLine}></span>
        </div>

        <Row className={styles.socialButton}>
          <Col xs={12} md={6}>
            <LoginSocialGoogle
              client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
              onResolve={loginfromGoogle}
              onReject={(err) => {
                /* eslint-disable no-console */
                console.log(err);
              }}>
              <GoogleLoginButton
                title='Google'
                align={'center'}
                icon={''}
                size='45px'
                className='tertiary-btn w-100'>
                <img src={googleIcon} width='25' height='25' alt='' /> Google
              </GoogleLoginButton>
            </LoginSocialGoogle>
          </Col>
          <Col xs={12} md={6}>
            <LoginSocialFacebook
              appId={process.env.APP_ID}
              onResolve={(response) => {
                handleFacebookLoginSuccess(response);
                /* eslint-disable no-console */
                console.log(response);
              }}
              onReject={(error) => {
                // handleFacebookLoginFailure(error);
                /* eslint-disable no-console */
                console.log(error);
              }}>
              <FacebookLoginButton
                title='Facebook'
                align={'center'}
                icon={''}
                size='45px'
                className='tertiary-btn w-100'>
                <img src={facebookIcon} width='25' height='25' alt='' />{' '}
                Facebook
              </FacebookLoginButton>
            </LoginSocialFacebook>
          </Col>
        </Row>

        <Row className='justify-content-center'>
          <div className={styles.alreadyMember}>
            Already a member?{' '}
            <NavLink className={styles.loginLink} to='/signin'>
              Log in
            </NavLink>
          </div>
        </Row>
      </Form>
    </>
  );
};

RegisterForm.propTypes = {
  onSubmitData: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default RegisterForm;
