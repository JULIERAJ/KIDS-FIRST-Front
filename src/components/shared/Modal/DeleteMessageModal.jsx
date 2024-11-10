import PropTypes from 'prop-types';

import { Container } from 'react-bootstrap';

import { CustomButton } from '@components/shared/ui/Button/CustomButton';

import modalStyles from './DeleteMessageModal.module.css';

const DeleteMessageModal = ({
  message,
  rightButtonText,
  onRightButtonClick,
  leftButtonText,
  onLeftButtonClick,
  isLeftButton,
}) => {
  return (
    <Container className={modalStyles['modal-overlay']}>
      <Container className={modalStyles['modal-container']}>
        <Container className={modalStyles['modal-content']}>
          <p className={modalStyles['modal-message']}>{message}</p>
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

DeleteMessageModal.propTypes = {
  message: PropTypes.string,
  rightButtonText: PropTypes.string,
  onRightButtonClick: PropTypes.func.isRequired,
  leftButtonText: PropTypes.string,
  onLeftButtonClick: PropTypes.func,
  isLeftButton: PropTypes.bool,
};

export default DeleteMessageModal;
