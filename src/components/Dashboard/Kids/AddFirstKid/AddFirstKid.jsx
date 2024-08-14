import { Container, Row } from 'react-bootstrap';

import { CustomButton } from '@components/shared/ui/Button/CustomButton';

import plus from '@media/icons/plus.svg';

import kidplaying from '@media/KidPlaying.svg';

import styles from './AddFirstKid.module.css';

const AddFirstKid = () => {
  return (
    <Container fluid className={styles['page-window']}>
    
      <Row className={styles['picture']}><img src={kidplaying} alt='picture' /></Row>

      <Row className={styles['text']}>
        <p >Click the button below to create your kid’s shareable profile.</p>
      </Row>
      
      <CustomButton
        styles={`${styles['add-kid-button']} secondary-dark`}
        type="submit" iconRight={plus}>

        Add Kid Profile
      </CustomButton>

    </Container>
  );
};
export default AddFirstKid;
