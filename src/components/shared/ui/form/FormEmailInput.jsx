import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import FormInput from './FormInput';

const FormEmailInput = ({ defaultValue, onChange, ...props }) => {
  const [email, setEmail] = useState(defaultValue || '');
  const [errors, setErrors] = useState('');

  const validateEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  useEffect(() => {
    if (defaultValue && !validateEmail(defaultValue)) {
      setErrors('Please enter a valid email address.');
    } else {
      setErrors('');
    }
  }, [defaultValue]);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    onChange(e);

    if (validateEmail(newEmail)) {
      setErrors('');
    } else {
      setErrors('Please enter a valid email address.');
    }
  };

  return (
    <FormInput
      id="email"
      label="Email"
      name="email"
      placeholder="user@mail.com"
      type="email"
      autoComplete="email"
      value={email}
      isInvalid={!!errors}
      errorMessage={errors}
      onChange={handleEmailChange}
      {...props}
    />
  );
};

FormEmailInput.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FormEmailInput;
