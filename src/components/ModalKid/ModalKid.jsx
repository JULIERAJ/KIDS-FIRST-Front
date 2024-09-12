import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import styles from '@components/shared/Modal/Modal.module.css';
import ProfileModal from '@components/shared/Modal/ProfileModal';

const KidsForm = () => {

  const colors = ['#FFE08C', '#FDA4A6', '#CFB6EF', '#A4D1F1', '#ADE4DA'];

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);

  };

  return (
    <>
      {isModalOpen && (
        <ProfileModal onClose={closeModal}
          isLeftButton={false}
          leftButtonText=""
          title="Profile picture"
          subtitle="Select a color for your child by clicking a circle below"
          rightButtonText="Save">
          <Container className={styles['modal-circles-container']}>
            <Container className={styles['circles-left']}>
              <div className={styles['big-circle']}><span className={styles['tiny-circle']}></span></div>
            </Container>

            <Container className={styles['circles-right']}>
              {colors.map((color, index) => (
                <div key={index}
                  className={styles['small-circle']}
                  style={{ backgroundColor: color }}
                ></div>))}
            </Container>
          </Container>
        </ProfileModal>
      )}
    </>
  );
};

export default KidsForm;