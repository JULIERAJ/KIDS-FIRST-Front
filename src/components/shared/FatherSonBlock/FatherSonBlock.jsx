import PropTypes from 'prop-types';
//import { Col, Row } from 'react-bootstrap';

import './styles.css';

const FatherSonBlock = ({ children }) => (
  <div>
    <div>{children}</div>
  </div>
);

FatherSonBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default FatherSonBlock;
