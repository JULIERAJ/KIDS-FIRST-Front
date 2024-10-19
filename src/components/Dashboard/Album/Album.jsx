import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap'; 

import albumImage from '@media/album/albumEmpty.png'; 

import styles from './Album.module.css';

const Album = ({ images }) => {
  return (
    <div className={styles['parent-container']}>
      <Container fluid className={styles['album-container']}>      
        <Row>
          <img src={images.albumImage} alt='albumImage' className={styles['album-image']} />
        </Row>
        <Row>
          <p className={styles['album-text']}>Images sent in messages are saved here!</p>
        </Row>
      </Container>
    </div>
  );
};

Album.propTypes = {
  images: PropTypes.shape({
    albumImage: PropTypes.string.isRequired,
  }),
};

// Default props if no images are passed
Album.defaultProps = {
  images: {
    albumImage,
  },
};

export default Album;
