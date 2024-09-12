import PropTypes from 'prop-types';

import React from 'react';
import { Container } from 'react-bootstrap';

import styles from '@components/shared/Modal/Modal.module.css';
import ProfileModal from '@components/shared/Modal/ProfileModal';

const ModalKid = ({ isModalOpen, closeModal }) => {
  const colors = ['#FFE08C', '#FDA4A6', '#CFB6EF', '#A4D1F1', '#ADE4DA'];

  return (
    <>
      {isModalOpen && (
        <ProfileModal
          onClose={closeModal}
          isLeftButton={false}
          leftButtonText=''
          title='Profile picture'
          subtitle='Select a color for your child by clicking a circle below'
          rightButtonText='Save'
        >
          <Container className={styles['modal-circles-container']}>
            <Container className={styles['circles-left']}>
              <div className={styles['big-circle']}>
                <span className={styles['tiny-circle']}></span>
              </div>
            </Container>

            <Container className={styles['circles-right']}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={styles['small-circle']}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </Container>
          </Container>
        </ProfileModal>
      )}
    </>
  );
};

ModalKid.propTypes = {
  isModalOpen: PropTypes.func.boolean,
  closeModal: PropTypes.func.isRequired,
};

export default ModalKid;
