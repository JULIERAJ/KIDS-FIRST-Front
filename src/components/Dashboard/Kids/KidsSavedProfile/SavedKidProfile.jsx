import PropTypes from 'prop-types';
import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';

import edit from '@media/icons/edit.svg';

import share from '@media/icons/share.svg';

import KidProfilePic from '../KidsInfo/kid.png';

import styles from './SavedKidProfile.module.css';

const SavedKidProfile = ({ kidProfile, colors }) => {
  const infoList = [
    { label: 'Allergies', value: kidProfile.allergies.join(', ') },
    { label: 'Interests', value: kidProfile.interests.join(', ') },
    { label: 'Fears', value: kidProfile.fears.join(', ') },
    { label: 'Other', value: kidProfile.otherNotes },
  ];

  return (
    <Container>
      <Row
        className={styles['profile-header']}
        style={{ backgroundColor: colors[kidProfile.childColor] }}
      >
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
              {kidProfile.dateOfBirthday} ({kidProfile.age} Years Old)
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
      <Row
        className={styles['info-list']}
        style={{ backgroundColor: colors[kidProfile.childColor] }}
      >
        {infoList.map((info, index) => (
          <Row key={index}>
            <Col xs={3} md={1} className={styles['add-kid-label']}>
              {info.label}:
            </Col>
            <Col className={styles['add-kid-value']}>{info.value}</Col>
          </Row>
        ))}
      </Row>
    </Container>
  );
};

SavedKidProfile.propTypes = {
  kidProfile: {
    name: PropTypes.string,
    dob: PropTypes.string,
    age: PropTypes.string,
    allergies: PropTypes.arrayOf(PropTypes.string),
    interests: PropTypes.arrayOf(PropTypes.string),
    fears: PropTypes.arrayOf(PropTypes.string),
    otherDetails: PropTypes.string,
  },
  colors: {
    name: PropTypes.string,
    hex: PropTypes.string,
  },
};

export default SavedKidProfile;
