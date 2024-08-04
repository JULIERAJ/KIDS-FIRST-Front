import axiosInstance from './utils/axiosInstance';

export const login = (email, password, rememberMe) => axiosInstance.post(
  'login', 
  { email, password, rememberMe }
);

export const logout = () => axiosInstance.post(
  'logout'
);

export const loginFacebook = (accessToken, userID) =>
  axiosInstance.post(
    'loginFacebook', 
    { accessToken, userID }
  );

export const loginSocial = (accessToken, userID) =>
  axiosInstance.post(
    'loginSocial', 
    { accessToken, userID }
  );

export const register = (opts) => axiosInstance.post(
  'register', 
  opts
);

export const createFamily = (opts) => axiosInstance.post(
  'family', 
  opts
);

export const createMember = ({
  firstName,
  lastName,
  kidsList,
  inviteeEmail,
  inviteeInviteLater,
  family,
  user,
}) =>
  axiosInstance.post(
    'member', 
    {
      firstName,
      lastName,
      kidsList,
      inviteeEmail,
      inviteeInviteLater,
      family,
      user,
    }
  );
  
export const activate = (email, emailVerificationToken) =>
  axiosInstance.get(
    `activate/${email}/${emailVerificationToken}`
  );

export const activateCoParent = (email, family, emailVerificationToken) =>
  axiosInstance.get(
    `register/${email}/${family}/${emailVerificationToken}`
  );

export const forgetPassword = (email) => axiosInstance.post(
  'forgot-password', 
  { email }
);

export const resetPasswordLink = (email, resetPasswordToken) =>
  axiosInstance.get(
    `reset-password/${email}/${resetPasswordToken}`
  );

export const resetPassword = (email, password, resetPasswordToken) =>
  axiosInstance.post(
    `reset-password/${email}/${resetPasswordToken}`, 
    {
      email,
      password,
      resetPasswordToken,
    }
  );

export const resendEmailVerification = (email) => axiosInstance.post(
  'resend-email', 
  { email }
);
