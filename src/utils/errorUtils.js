export const validateEmail = (email) => {
  const EMAIL_REG_EXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REG_EXP.test(email);
};

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
