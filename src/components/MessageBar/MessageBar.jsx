import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import styles from './MessageBar.module.css';

const MessageBar = ({ variant, children }) => {
  return (
    <Card className={`my-2 px-4 py-2 ${styles.message__bar} ${styles[`message__bar-${variant}`]}`}>
      <Card.Body>
        <div>{children}</div>
      </Card.Body>
    </Card>
  );
};

MessageBar.propTypes = {
  variant: PropTypes.oneOf(['error', 'success']),
  children: PropTypes.node,
};

export default MessageBar;
