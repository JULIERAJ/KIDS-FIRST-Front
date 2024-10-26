import { useState, useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';

import { getAllKids } from '@api';
import KidForm from '@components/Dashboard/Kids/KidsInfo/KidForm';
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import { ReactComponent as Plus } from '@media/icons/plus.svg';

import AddFirstKid from './AddFirstKid';
import styles from './kids.module.css';
import SavedKidProfile from './KidsSavedProfile/SavedKidProfile';

import savedKidStyles from './KidsSavedProfile/SavedKidProfile.module.css';

const Kids = () => {
  const [kidForm, openKidForm] = useState(false);
  const [fetchKidsCount, setFetchKidsCount] = useState(0);
  const [kidsProfiles, setKidsProfiles] = useState();
  const colors = {
    yellow: '#FFE08C',
    red: '#FDA4A6',
    purple: '#CFB6EF',
    blue: '#A4D1F1',
    green: '#ADE4DA',
  };

  useEffect(() => {
    getKidsProfiles();
  }, [fetchKidsCount]);

  const getKidsProfiles = async () => {
    try {
      const response = await getAllKids();
      // eslint-disable-next-line no-console
      console.log('Kids fetched:', response.data);
      setKidsProfiles(response.data.kids);
    } catch (error) {
      // Improved error logging
      console.error('Error occurred:', error.message);
      if (error.response) {
        console.error(
          'Server responded with:',
          error.response.status,
          error.response.data
        );
      } else {
        console.error('No response from server');
      }
    }
  };

  return (
    <Container fluid className={styles['main-kid-container']}>
      {kidsProfiles && kidsProfiles.length > 0 && !kidForm ? (
        <Container className={savedKidStyles['kids-profiles-container']}>
          {kidsProfiles.map((kidProfile) => (
            <SavedKidProfile
              key={`kidProfile-${kidProfile._id}`}
              openKidForm={openKidForm}
              kidProfile={kidProfile}
              colors={colors}
            />
          ))}
          <Row className={savedKidStyles['add-kid-container']}>
            <CustomButton
              styles={'sml secondary-light'}
              iconRight={<Plus />}
              onClick={() => openKidForm(true)}
            >
              Add Kid
            </CustomButton>
          </Row>
        </Container>
      ) : kidForm ? (
        <KidForm
          openKidForm={openKidForm}
          setFetchKidsCount={setFetchKidsCount}
          fetchKidsCount={fetchKidsCount}
        />
      ) : (
        <AddFirstKid openKidForm={openKidForm} />
      )}
    </Container>
  );
};
export default Kids;
