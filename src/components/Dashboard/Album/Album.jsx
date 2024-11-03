import PropTypes from 'prop-types';

import { Container, Row } from 'react-bootstrap'; 

import album from '@media/icons/emptyAlbum.svg'; 

import styles from './Album.module.css';

const Album = ({ images }) => {
  return (
    
    <Container fluid className={styles['album-container']}>      
      <Row className={styles['album-image']}>
        <img src={images.album} alt='albumImage' />
      </Row>
      <Row className={styles['album-text']}>
        <p >Images sent in messages are saved here!</p>
      </Row>
    </Container>
    
  );
};

Album.propTypes = {
  images: PropTypes.shape({
    album: PropTypes.string.isRequired,
  }),
};

Album.defaultProps = {
  images: {
    album,
  },
};

export default Album;
