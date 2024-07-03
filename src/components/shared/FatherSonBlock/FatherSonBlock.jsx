import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import styles from './FatherSonBlock.module.css';

const FatherSonBlock = ({ children }) => (
  <Row>
    <Col xs={12} md={6} className={styles.col_left} />

    <Col xs={12} md={6} className={styles.col_right}>
      <div className={styles.col_right_content}>{children}</div>
    </Col>
  </Row>
);

FatherSonBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default FatherSonBlock;
