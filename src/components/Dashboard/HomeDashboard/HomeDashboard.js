import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import MessageNotification from './MessageNotification'; 
import PendingEvents from './PendingEvents'; 
import WeeksOverview from './WeeksOverview'; 

const HomeDashboard = () => {
  return (
    <Container fluid>
      <Row>
        {/* Weeks Overview */}
        <WeeksOverview />
      </Row>

      <Row style={{ marginTop : 40 }}>
        {/* Pending Events */}
        <Col >
          <PendingEvents />
        </Col>
        {/* Message Notification */}
        <Col >
          <MessageNotification />
        </Col>
      </Row>

    </Container>
  );
};

export default HomeDashboard;
