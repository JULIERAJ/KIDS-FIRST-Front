import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

import { loginFacebook, loginSocial } from '@api';
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import FormEmailInput from '@components/shared/ui/form/FormEmailInput';
import {
  FormFirstNameInput,
  FormLastNameInput,
} from '@components/shared/ui/form/FormNameInput';
import FormPasswordInput from '@components/shared/ui/form/FormPasswordInput';
import SocialLoginButton from '@components/shared/ui/SocialLoginButton/SocialLoginButton';

import { 
  handleCommonErrors,
  validateName,
  validateEmail,
  validatePassword
} from '@utils/validationUtils'; 

import styles from './Register.module.css';

const RegisterForm = ({ onSubmitData, errorMsg }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState(errorMsg || '');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [initialFocus, setInitialFocus] = useState(false);
  const [showTextPassword, setShowTextPassword] = useState('');
  const [firstNameErrors, setFirstNameErrors] = useState('');
  const [lastNameErrors, setLastNameErrors] = useState('');
  const [allPasswordErrorsChecked, setAllPasswordErrorsChecked] = useState(false);
  const inputRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (errorMsg) {
      if (errorMsg.includes('email')) {
        setEmailError(errorMsg);
        setErrorMessage('');
      } else {
        setEmailError('');
        setErrorMessage(errorMsg);
      }
      setSuccessMessage('');
    }
  }, [errorMsg]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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

  const handleLastNameChange = (e) => {
    const value = e.target.value.trim();
    let newErrors = '';
    if (!validateName(value)) {
      newErrors = 'Descriptive Text';
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
      if (!validateEmail(emailValue)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setShowTextPassword('');
    validatePassword(passwordValue, setErrorMessage, setAllPasswordErrorsChecked, setSuccessMessage);
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
    validatePassword(e.target.value, setErrorMessage, setAllPasswordErrorsChecked, setSuccessMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = [
      {
        value: firstName.trim(),
        errorSetter: setFirstNameErrors,
        placeholder: 'your first name',
      },
      {
        value: email.trim(),
        errorSetter: setEmailError,
        placeholder: 'a valid email address',
      },
    ];
    let hasEmptyField = false;

    fields.forEach(({ value, errorSetter, placeholder }) => {
      if (value === '' || value === placeholder) {
        errorSetter(`Please enter ${placeholder.toLowerCase()}`);
        hasEmptyField = true;
      }
    });

    if (!password.trim()) {
      setErrorMessage(
        'Include at least: • 8 characters • upper and lower case characters • a number • a special character'
      );
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
      onSubmitData(firstName, lastName, email, password)
        .catch((response) => {
          handleCommonErrors(response, setErrorMessage);
        });
    }
  };

  const loginfromGoogle = (response) => {
    loginSocial(response.data.access_token, response.data.email)
      .then((res) => {
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        navigate('/dashboard');
      })
      .catch(({ response }) => {
        setErrorMessage(response.data.error || 'Ops! Something went wrong. Please try again later');
      });
  };

  const handleFacebookLoginSuccess = (response) => {
    loginFacebook(response.data.accessToken, response.data.userID)
      .then((res) => {
        const user = JSON.stringify(res.data);
        localStorage.setItem('storedUser', user);
        navigate('/dashboard');
      })
      .catch(({ response }) => {
        setErrorMessage(response.data.error || 'Ops! Something went wrong. Please try again later');
      });
  };

  return (
    <>
      <Form className={`py-4 ${styles.form}`} onSubmit={handleSubmit} noValidate>
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
              ref={inputRef}
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
          isInvalid={!!errorMessage}
          errors={errorMessage}
          labelClassName={styles.label}
          successMessage={successMessage}
          onFocus={handleFocus}
          onBlur={handleBlur}
          showTextPassword={showTextPassword}
        />

        <CustomButton
          styles={`primary-light ${styles.customButton}`}
          type='submit'>
          Sign up
        </CustomButton>
        <div className={styles.orDivider}>
          <span className={styles.dashLine}></span>
          <span className={styles.orText}>Or</span>
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
  errorMsg: PropTypes.string,
};

export default RegisterForm;
