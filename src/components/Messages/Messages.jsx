/* eslint-disable import/no-unresolved */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line import/order
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
// eslint-disable-next-line import/order
import messages from '@media/icons/messages.svg';

import styles from './Messages.module.css';

const messagesScreen = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/dashboard/kids');
  };
  return(
    <Container fluid className={styles['messages-container']}>
      <Row><img src={messages} alt= "Messages" style={{ width: '18.75rem', height: '17.938rem' }} /></Row>
      <Row>
        <p className={styles['content-style']}>Ready to chat? Share your Kid Profile with co-parent <br />
              to unlock the Messaging feature
        </p>
      </Row>
      <Row>
        <CustomButton 
          className={`med secondary-light ${styles['share-kid-button']}`}
          textStyles='text-style'
          onClick={handleButtonClick}
        >
          Share Kid Profile
        </CustomButton>
      </Row>
    </Container>
  );
};

export default messagesScreen;
