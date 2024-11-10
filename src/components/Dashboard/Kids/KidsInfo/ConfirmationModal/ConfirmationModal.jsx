import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';

import { CustomButton } from '@components/shared/ui/Button/CustomButton';

import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Header style={{ border: 'none' }}> 
        {/* Optional header content */}
      </Modal.Header>
      
      <Modal.Body className={styles.modalBody}>
        Are you sure you want to remove the profile picture?
      </Modal.Body>

      <Modal.Footer
        className="justify-content-center"
        style={{ border: 'none', paddingBottom: '45px' }}
      >
        <div className={styles.buttonContainer}>
          <CustomButton
            styles='secondary-light mx-2'
            size='xsml'
            type='button'
            onClick={onHide}
          >
              Cancel
          </CustomButton>
          <CustomButton
            styles='primary-light mx-2'
            size='xsml'
            type='button'
            onClick={onConfirm}
          >
              Delete
          </CustomButton>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
