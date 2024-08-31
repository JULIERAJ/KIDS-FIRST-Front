import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';

import { CustomButton } from '@components/shared/ui/Button/CustomButton';

import edit from '../../media/icons/edit.svg';
import plus from '../../media/icons/plus.svg';
import share from '../../media/icons/share.svg';

import KidProfilePic from '../KidsInfo/kid.png';

import styles from './SavedKidProfile.module.css';

const SavedKidProfile = () => {
  const kidProfile = {
    name: 'James',
    dob: '09/09/2017',
    age: '5 Years Old',
    allergies: ['Eggs', 'Peanuts'],
    interests: ['Dancing', 'Skiing'],
    fears: ['Darkness'],
    otherDetails:
      'James is very sensitive to loud noises and prefers quiet activities.' +
      ' She loves spending time with friends but cannot stay in the sun long due to her sensitive skin,' +
      ' even with the best sunscreens. She enjoys indoor games and reading books.',
  };

  return (
    <Container className={styles['kid-profile-card']}>
      <Row className={styles['profile-header']}>
        <Col xs={12} md={6} className={styles['kid-details']}>
          <Image
            src={KidProfilePic}
            alt={kidProfile.name}
            className={styles['kid-profile-img']}
            roundedCircle
          />
          <div className={styles['kid-info']}>
            <h2 className={styles['kid-profile-name']}>{kidProfile.name}</h2>
            <p className={styles['kid-dob']}>
              {kidProfile.dob} ({kidProfile.age})
            </p>
          </div>
        </Col>

        <Col xs={12} md={6} className={styles['actions']}>
          <div className={styles['action-item']}>
            <span className={styles['action-text']}>Share</span>
            <Image src={share} alt='Share' className={styles['action-icon']} />
          </div>
          <div className={styles['action-item']}>
            <span className={styles['action-text']}>Edit</span>
            <Image src={edit} alt='Edit' className={styles['action-icon']} />
          </div>
        </Col>
      </Row>
      <Row className={styles['info-list']}>
        <Row>
          <Col xs={3} md={1} className={styles['add-kid-label']}>
            Allergies:
          </Col>
          <Col className={styles['add-kid-value']}>
            {kidProfile.allergies.join(', ')}
          </Col>
        </Row>
        <Row>
          <Col xs={3} md={1} className={styles['add-kid-label']}>
            Interests:
          </Col>
          <Col className={styles['add-kid-value']}>
            {kidProfile.interests.join(', ')}
          </Col>
        </Row>
        <Row>
          <Col xs={3} md={1} className={styles['add-kid-label']}>
            Fears:
          </Col>
          <Col className={styles['add-kid-value']}>
            {kidProfile.fears.join(', ')}
          </Col>
        </Row>
        <Row>
          <Col xs={3} md={1} className={styles['add-kid-label']}>
            Other:
          </Col>
          <Col className={styles['add-kid-value']}>
            {kidProfile.otherDetails}
          </Col>
        </Row>
      </Row>
      <Row>
        <Col className={styles['add-kid-button-col']}>
          <CustomButton
            styles={`${styles['add-kid-button']} secondary-light `}
            iconRight={plus}
          >
            Add Kid
          </CustomButton>
        </Col>
      </Row>
    </Container>
  );
};

export default SavedKidProfile;
