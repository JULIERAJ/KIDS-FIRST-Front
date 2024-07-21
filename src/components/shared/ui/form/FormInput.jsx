import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { BsExclamationCircle, BsCheckLg } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import styles from './FormInput.module.css';

const FormInput = React.forwardRef(function FormInput(props, ref) {
  const {
    label,
    showPassword,
    togglePasswordVisibility,
    errorMessage,
    successMessage,
    showTextPassword,
    labelClassName,
    type,
    value,
    onChange,
    onFocus,
    onBlur,
    autoComplete,
    ...rest
  } = props;

  const inputRef = useRef(null);

  const combinedRef = ref || inputRef;
  useEffect(() => {
    if (combinedRef.current) {
      combinedRef.current.value = value || '';
    }
  }, [value]);

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const isPassword = label === 'Password' || 'New Password';

  return (
    <Form.Group className={styles.formGroup}>
      <Form.Label className={labelClassName}>{label}</Form.Label>
      <InputGroup className={styles.inputGroup}>
        <Form.Control
          ref={combinedRef}
          {...rest}
          type={isPassword && showPassword ? 'text' : type}
          className={`${styles.inputField}
          ${
    errorMessage
      ? styles.errorInput
      : successMessage
        ? styles.successInput
        : ''
    }`}
          value={value}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          isInvalid={!!errorMessage}
          autoComplete={autoComplete}
        />
        {isPassword && value && (
          <div
            className={`${styles.formInputIcon} ${
              errorMessage ? styles.formInputIconError : ''
            }`}
            onClick={togglePasswordVisibility}
            role='button'
            tabIndex={0}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        )}
      </InputGroup>
      {successMessage && (
        <Form.Control.Feedback
          className={`${styles.feedback} ${styles.successFeedback}`}>
          <BsCheckLg className={`${styles.icon} ${styles.successIcon}`} />
          {successMessage}
        </Form.Control.Feedback>
      )}
      {errorMessage && (
        <Form.Control.Feedback
          type='invalid'
          className={`${styles.feedback} ${styles.errorFeedback}`}>
          <BsExclamationCircle
            className={`${styles.icon} ${styles.errorIcon}`}
          />
          {errorMessage}
        </Form.Control.Feedback>
      )}
      {showTextPassword && (
        <Form.Text className={styles.passwordText}>
          {showTextPassword}
        </Form.Text>
      )}
    </Form.Group>
  );
});

FormInput.propTypes = {
  label: PropTypes.node,
  showPassword: PropTypes.bool,
  togglePasswordVisibility: PropTypes.func,
  hidePassword: PropTypes.func,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  labelClassName: PropTypes.string,
  successMessage: PropTypes.string,
  showTextPassword: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default FormInput;
