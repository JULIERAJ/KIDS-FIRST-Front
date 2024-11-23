/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import MessageIllustration from '@media/icons/message-illustration.svg';
import attachFiles from '@media/icons/attach-file.svg';

import styles from './ChatScreen.module.css';

const ChatScreen = () => {
  const firstName = 'John';
  const initial = `${firstName.charAt(0)}`.toUpperCase();

  return (
    <Container fluid className={styles['page-window']}>
      <Row 
        className={`justify-content-md-start  ${styles['co-parent-details']}`}
        style={{ columnGap: '1rem' }}
      >
        <div className={styles['co-parent-initial-wrapper']}>
          <div>
            <span className={styles['co-parent-initial']}>{initial}</span>
          </div>
          <div className={`${styles['co-parent-status-wrapper']}`} >
            <h2 className={styles['co-parent-name']}>{firstName}</h2>
            <div>
              <p className={styles['co-parent-status']}>offline</p>
            </div>
          </div>
        </div>
      </Row>

      <Row className={styles['chatting-container']}>
        <div className={styles['chat-image']}>
          <div>
            <img src={MessageIllustration} alt='VisuallyIllustration' 
              style={{ width: '18.75rem', height: '17.938rem', }}/>
          </div>
          <div>
            <p className={styles['chat-content']}> 
              All messages are visible to your co-parent.<br />
              The tone meter promotes peaceful communication.<br />
              You have 60 seconds to delete a message if needed.
            </p>
          </div>
        </div>
      </Row>
      <Row className={styles['chat-input-container']}>
        <div className={styles['chat-input']}>
          <div className={styles['attach-files']}>
            <img 
              src={attachFiles} 
              alt="Attach Files" 
              className={styles['attach-file-icon']}
            />
          </div>
          <div className={styles['input-wrapper']}>
            <input 
              type="text" 
              className={styles['chat-input-box']} 
              placeholder="Send a message" 
            />
          </div>
          <div className={styles['custom-button-send']}>
            <CustomButton className="xsml primary-light textStyels">
              Send
            </CustomButton>
          </div>
        </div>
      </Row>

    </Container>
  );
};

export default ChatScreen;
