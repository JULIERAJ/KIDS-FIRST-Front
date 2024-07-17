import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { validateEmail } from '@utils/validationUtils';

import FormInput from './FormInput';

const FormEmailInput = React.forwardRef(function FormEmailInput(props, ref) {
  const { defaultValue, onChange, errors: externalErrors, ...rest } = props;

  const [email, setEmail] = useState(defaultValue || '');
  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (defaultValue && !validateEmail(defaultValue)) {
      setErrors('Please enter a valid email address.');
    } else {
      setErrors('');
    }
  }, [defaultValue]);

  useEffect(() => {
    setErrors(externalErrors);
  }, [externalErrors]);

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
      ref={ref}
      id='email'
      label='Email'
      name='email'
      placeholder='user@mail.com'
      type='email'
      autoComplete='email'
      value={email}
      isInvalid={!!errors}
      errorMessage={errors}
      onChange={handleEmailChange}
      {...rest}
    />
  );
});

FormEmailInput.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.string,
};

export default FormEmailInput;
