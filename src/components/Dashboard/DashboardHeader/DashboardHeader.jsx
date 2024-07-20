import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

import styles from './DashboardHeader.module.css';

const DashboardHeader = ({ title , user }) => {
  const { firstName , lastName } = user;
  const initial = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  return (
    <Container fluid as='aside' className={`${styles.Dashboard}`}>
      <div className={`${styles.heading}`}>
        <h2 className={`${styles.rightAlign}`}>{title}</h2>
      </div>
      <div className={styles.title}>
        <h2 className={`${styles.leftAlign}`}>Hello {firstName}!</h2>
        <div className={styles.circleContainer}>
       
          <span className={styles.circleText}>{initial}</span>
        </div>
      </div>
    </Container>
  );
};

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }).isRequired
};

export default DashboardHeader;
