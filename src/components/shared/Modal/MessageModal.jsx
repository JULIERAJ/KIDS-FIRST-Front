import PropTypes from 'prop-types';

import { CustomButton } from '@components/shared/ui/Button/CustomButton';

import icon from '../../../media/icons/close.svg';
import iconRight from '../../../media/icons/doneOrange.svg';

import styles from './MessageModal.module.css';

const MessageModal = ({ text, onClose }) => {
  return (
    <div
      className={styles['modal-overlay']}>
      <div
        className={styles['modal-container']}>
        <div className={styles['modal-content']}>
          <p className={styles['modal-text']}>{text}</p>
          <CustomButton className={`secondary-light ${styles['modal-button']}`}
            onClick={onClose}
            iconRight={iconRight}>Done</CustomButton>
          <button className={styles['modal-close-button']} onClick={onClose}><img src={icon} /> </button>
        </div >
      </div>
    </div>
  );
};

MessageModal.propTypes = {
  text: PropTypes.string,
  onClose: PropTypes.func,
};

export default MessageModal;
