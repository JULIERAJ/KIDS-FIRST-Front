import PropTypes from 'prop-types';

import { Container } from 'react-bootstrap';

import { CustomButton } from '@components/shared/ui/Button/CustomButton';

import icon from '@media/icons/close.svg';
import { ReactComponent as IconRight } from '@media/icons/doneOrange.svg';

import styles from './Modal.module.css';

const MessageModal = ({ message, onClose }) => {
  return (
    <Container className={styles['modal-overlay']}>
      <Container className={styles['modal-container']}>
        <Container className={styles['modal-content']}>
          <p className={styles['modal-message']}>{message}</p>
        </Container>
        <Container className={styles['modal-buttons']}>
          <CustomButton
            className={`secondary-light ${styles['modal-button']} ${styles['modal-message-button']}`}
            onClick={onClose}
            iconRight={<IconRight />}
          >
            Done
          </CustomButton>
        </Container>
        <button className={styles['modal-close-button']} onClick={onClose}>
          <img src={icon} />{' '}
        </button>
      </Container>
    </Container>
  );
};

MessageModal.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
};

export default MessageModal;
