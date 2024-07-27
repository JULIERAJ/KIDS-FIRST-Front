import NotificationPage from '@components/shared/NotificationPage';
import logoPswdChanged from '@media/icons/pswd-changed.svg';

export default function PasswordChanged() {
  return (
    <NotificationPage
      title="Password Changed"
      image={logoPswdChanged}
      altText="password-changed-successfully"
      message="Password has been updated!"
      description="You can now log in with the new password."
      linkText="Back To Log In"
      linkTo="/signin"
    />
  );
}
