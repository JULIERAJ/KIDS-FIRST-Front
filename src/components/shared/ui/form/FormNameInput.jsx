/* eslint-disable no-undef */
import PropTypes from 'prop-types';

import React from 'react';

import FormInput from './FormInput';
import styles from './FormInput.module.css'; // Import the CSS module

export const FormFirstNameInput = React.forwardRef(function FormFirstNameInput(
  props,
  ref
) {
  return (
    <FormInput
      id='firstname'
      label='First Name'
      name='FirstName'
      placeholder='First Name'
      type='text'
      defaultValue={props.defaultValue}
      isInvalid={!!props.errors}
      errorMessage={props.errors}
      ref={ref}
      {...props}
    />
  );
});

FormFirstNameInput.propTypes = {
  defaultValue: PropTypes.string,
  errors: PropTypes.string,
};

export const FormLastNameInput = (props) => (
  <FormInput
    id='lastname'
    name='LastName'
    label={
      <>
        Last Name <span className={styles.optionalText}> (optional)</span>
      </>
    }
    placeholder='Last Name'
    type='text'
    defaultValue={props.defaultValue}
    isInvalid={!!props.errors}
    errorMessage={props.errors}
    className={styles.input__last}
    {...props}
  />
);

FormLastNameInput.propTypes = {
  defaultValue: PropTypes.string,
  errors: PropTypes.string,
};
