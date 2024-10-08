import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';

import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton style={{ border: 'none' }}> 
        {/* Optional title can be added here */}
      </Modal.Header>
      
      <Modal.Body className={styles.modalBody}>
        Are you sure you want to remove the profile picture?
      </Modal.Body>

      <Modal.Footer
        className="justify-content-center"
        style={{ border: 'none', paddingBottom: '45px' }}
      >
        <div className="d-flex gap-3 buttonContainer">
          <button className={styles.cancelButton} onClick={onHide}>Cancel</button>
          <button className={styles.deleteButton} onClick={onConfirm}>Delete</button>
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
