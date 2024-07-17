export const regexUpperCase = /[A-Z]/;
export const regexLowerCase = /[a-z]/;
export const regexNumber = /\d/;
export const regexSpecialChar = /[!@#$%^&*()_+=[\]{};':"\\|,.<>?-]/;
export const regexLength = /^.{8,40}$/;
export const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
  return regexEmail.test(email);
};

export const validateName = (name) => /^[a-zA-Z]*$/.test(name);

export const handleCommonErrors = (response, setErrorMessage) => {
  if (response.status === 404) {
    setErrorMessage(
      'This account doesn\'t exist. Please enter a different email address or try "Sign Up".'
    );
  } else if (response.status === 401) {
    setErrorMessage('Invalid password or email address');
  } else {
    setErrorMessage('Ops! Something went wrong. Please try again later.');
  }
};

export const updateErrorMessage = (errorMessagePassword, setErrorMessage) => {
  const errorMessageWithInclude = errorMessagePassword
    ? `Include at least: ${errorMessagePassword}`
    : '';

  setErrorMessage(errorMessageWithInclude || errorMessagePassword);
};

export const validatePassword = (passwordValue, setErrorMessage, setAllPasswordErrorsChecked, setSuccessMessage) => {
  const errors = {
    uppercase: !regexUpperCase.test(passwordValue),
    lowercase: !regexLowerCase.test(passwordValue),
    number: !regexNumber.test(passwordValue),
    special: !regexSpecialChar.test(passwordValue),
    length: !regexLength.test(passwordValue),
  };
  const allErrorsResolved = Object.values(errors).every((error) => !error);
  setAllPasswordErrorsChecked(allErrorsResolved);
  setSuccessMessage(allErrorsResolved ? 'Password accepted' : '');

  const errorMessagePassword = Array.from(
    new Set(
      Object.entries(errors)
        // eslint-disable-next-line no-unused-vars
        .filter(([_, value]) => value)
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
    )
  ).join(', ');

  updateErrorMessage(errorMessagePassword, setErrorMessage);
};
