import { Container, Row } from 'react-bootstrap';

import { CustomButton } from '@components/shared/ui/Button/CustomButton';

import plus from '@media/icons/plus.png';

import kidplaying from '../../../media/KidPlaying.png';

import styles from './AddFirstKid.module.css';

const AddFirstKid = () => {
  return (
    <Container fluid className={styles['frame']}>
      <Row className={styles['picture']}><img src={kidplaying} alt='picture' /></Row>

      <Row className={styles['text']}>
        <p >Click the button below to create your kid’s shareable profile.</p>
      </Row>
      <CustomButton
        styles={`secondary-light ${styles['reset-custom-button']}`}
        type="submit" iconRight={plus}>

                Add Kid Profile
      </CustomButton>

    </Container>
  );
};
export default AddFirstKid;
