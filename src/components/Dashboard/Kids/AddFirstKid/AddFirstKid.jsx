import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';

import { CustomButton } from '@components/shared/ui/Button/CustomButton';

import { ReactComponent as Plus } from '@media/icons/plus.svg';

import kidplaying from '@media/KidPlaying.svg';

import styles from './AddFirstKid.module.css';

const AddFirstKid = ({ openKidForm }) => {
  return (
    <Container fluid className={styles['page-window']}>
      <Row className={styles['picture']}><img src={kidplaying} alt='picture' /></Row>
      <Row className={styles['text']}>
        <p >Click the button below to create your kid’s shareable profile.</p>
      </Row>
      <CustomButton
        styles={'secondary-light med'}
        type="submit" iconRight={<Plus />}
        onClick={() => openKidForm(true)}
      >
        Add Kid Profile
      </CustomButton>
    </ Container>
  );
};

AddFirstKid.propTypes = {
  openKidForm: PropTypes.func.required,
};

export default AddFirstKid;
