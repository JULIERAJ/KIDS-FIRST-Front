import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import addIcon from '@components/shared/ui/Icon/add.svg';

import styles from './HomeDashboard.module.css';
import MessageNotification from './MessageNotification';
import PendingEvents from './PendingEvents';
import WeeksOverview from './WeeksOverview';

const HomeDashboard = () => {
  const navigate = useNavigate();
  const childExists = false;

  const handleButtonClick = () => {
    navigate('/dashboard/kids');
  };

  return (
    <>
      {childExists ? (
        <Container fluid>
          <Row>
            {/* Weeks Overview */}
            <WeeksOverview />
          </Row>
          <Row style={{ marginTop: 40 }}>
            {/* Pending Events */}
            <Col>
              <PendingEvents />
            </Col>
            {/* Message Notification */}
            <Col>
              <MessageNotification />
            </Col>
          </Row>
        </Container>
      ) : (
        <div className={styles['page-window']}>
          <h1 className={styles.title}>
            Create your kid’s profile and add all the necessary information by
            clicking Add Your Kid button.
          </h1>
          <CustomButton
            styles={`${styles['custom-button']} secondary-light`}
            iconRight={addIcon}
            iconRightStyles='icon-right-style'
            textStyles='text-style'
            onClick={handleButtonClick}
            // onClick={() => setShowPart(true)}
          >
            Add your kid
          </CustomButton>
        </div>
      )}
    </>
  );
};

export default HomeDashboard;
