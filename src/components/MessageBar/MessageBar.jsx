import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import styles from './MessageBar';

const MessageBar = ({ variant, children }) => {
  return (
    <>
      <Card
        className={`my-2 ${styles['message-bar']} ${styles['message-bar']}-${variant}`}>
        <Card.Body>
          <div>{children}</div>
        </Card.Body>
      </Card>
    </>
  );
};

MessageBar.propTypes = {
  variant: PropTypes.oneOf(['error', 'success']),
  children: PropTypes.node,
};

export default MessageBar;
