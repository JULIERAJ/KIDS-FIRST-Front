
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import ProfileModal from '@components/shared/Modal/ProfileModal';
import done from '@media/icons/done.svg';

import styles from './ModalKid.module.css';

const ModalKid = ({ isModalOpen, closeModal, colors, color, setColor, customHandleChange }) => {
  const [tempColor, setTempColor] = useState();

  useEffect(() => {
    if(isModalOpen === false) {
      setTempColor(color);
    }
  }, [isModalOpen]);

  const handleColorSave = (e) => {
    e.preventDefault();

    setColor(tempColor);
    customHandleChange('childColor', tempColor.name);
    closeModal();
  };

  return (
    <>
      {isModalOpen && (
        <ProfileModal
          onClose={closeModal}
          isLeftButton={false}
          title='Profile picture'
          subtitle='Select a color for your child by clicking a circle below'
          rightButtonText='Save'
          onRightButtonClick={handleColorSave}
        >
          <Container className={styles['modal-circles-container']}>
            <Container className={styles['circles-left']}>
              <div
                className={styles['big-circle']}
                style={{ backgroundColor: tempColor.hex }}
              >
                <span
                  className={styles['tiny-circle']}
                  style={{ backgroundColor: tempColor.hex }}
                ></span>
              </div>
            </Container>

            <Container className={styles['circles-right']}>
              {colors.map((color) => (
                <button
                  type='button'
                  key={`${color.name}-button`}
                  className={styles['small-circle']}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setTempColor(color)}
                >
                  {tempColor.name === color.name && <img src={done} />}
                </button>
              ))}
            </Container>
          </Container>
        </ProfileModal>
      )}
    </>
  );
};

ModalKid.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  colors: PropTypes.array,
  color: PropTypes.object,
  setColor: PropTypes.func.isRequired,
  customHandleChange: PropTypes.func.isRequired,
};

export default ModalKid;
