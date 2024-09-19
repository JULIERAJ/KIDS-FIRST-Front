import PropTypes from 'prop-types';

import { Container } from 'react-bootstrap';

import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import icon from '@media/icons/close.svg';

import modalStyles from './Modal.module.css';

const ProfileModal = ({
  children,
  onClose,
  title,
  subtitle,
  rightButtonText,
  onRightButtonClick,
  leftButtonText,
  onLeftButtonClick,
  isLeftButton,
}) => {
  return (
    <Container className={modalStyles['modal-overlay']}>
      <Container className={modalStyles['modal-container']}>
        <button className={modalStyles['modal-close-button']} onClick={onClose}>
          <img src={icon} />
        </button>
        <h5 className={modalStyles['modal-title']}>{title}</h5>
        <p className={modalStyles['modal-subtitle']}>{subtitle}</p>
        <Container className={modalStyles['modal-content']}>
          {children}
        </Container>
        <Container className={modalStyles['modal-buttons']}>
          {isLeftButton && (
            <CustomButton
              className={'secondary-light xsml'}
              onClick={onLeftButtonClick}
            >
              {leftButtonText}
            </CustomButton>
          )}
          <CustomButton
            className={'primary-light xsml'}
            onClick={onRightButtonClick}
          >
            {rightButtonText}
          </CustomButton>
        </Container>
      </Container>
    </Container>
  );
};

ProfileModal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  rightButtonText: PropTypes.string,
  onRightButtonClick: PropTypes.func.isRequired,
  leftButtonText: PropTypes.string,
  onLeftButtonClick: PropTypes.func,
  isLeftButton: PropTypes.bool,
};

export default ProfileModal;
