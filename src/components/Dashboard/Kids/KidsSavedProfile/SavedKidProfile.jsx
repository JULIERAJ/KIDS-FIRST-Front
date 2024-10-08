import PropTypes from 'prop-types'; 
import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import edit from '@media/icons/edit.svg';

import share from '@media/icons/share.svg';

import KidProfilePic from '../KidsInfo/kid.png';

import styles from './SavedKidProfile.module.css';

const SavedKidProfile = ({ kidProfile, colors }) => {
  const navigate = useNavigate();

  // Check if kidProfile exists and has required fields
  if (!kidProfile) {
    return <p>No profile saved yet.</p>;
  }

  // Add default values for missing fields
  const infoList = [
    { label: 'Allergies', value: kidProfile.allergies?.length ? kidProfile.allergies.join(', ') : 'None' },
    { label: 'Interests', value: kidProfile.interests?.length ? kidProfile.interests.join(', ') : 'None' },
    { label: 'Fears', value: kidProfile.fears?.length ? kidProfile.fears.join(', ') : 'None' },
    { label: 'Other', value: kidProfile.otherNotes || 'None' },
  ];

  return (
    <Container>
      <Row
        className={styles['profile-header']}
        style={{ backgroundColor: colors[kidProfile.childColor] }}
      >
        <Col xs={12} md={6} className={styles['kid-details']}>
          <Image
            src={kidProfile.imageProfileURL || KidProfilePic}
            alt={kidProfile.name}
            className={styles['kid-profile-img']}
            roundedCircle
          />
          <div className={styles['kid-info']}>
            <h2 className={styles['kid-profile-name']}>{kidProfile.name}</h2>
            <p className={styles['kid-dob']}>
              {kidProfile.dateOfBirthday} ({kidProfile.age || 'N/A'} Years Old)
            </p>
          </div>
        </Col>
        <Col xs={12} md={6} className={styles['actions']}>
          <div className={styles['action-item']}>
            <span className={styles['action-text']}>Share</span>
            <Image src={share} alt='Share' className={styles['action-icon']} />
          </div>
          <div
            className={styles['action-item']}
            onClick={() => {
              if (kidProfile.id) {
                navigate(`/dashboard/kidsForm/${kidProfile.id}`);
              } else {
                console.error('kidProfile.id is undefined');
              }
            }}
          >
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
  kidProfile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    dateOfBirthday: PropTypes.string,
    age: PropTypes.string,
    allergies: PropTypes.arrayOf(PropTypes.string),
    interests: PropTypes.arrayOf(PropTypes.string),
    fears: PropTypes.arrayOf(PropTypes.string),
    otherNotes: PropTypes.string,
    childColor: PropTypes.string,
    imageProfileURL: PropTypes.string,
  }).isRequired,
  colors: PropTypes.object.isRequired,
};

export default SavedKidProfile;
