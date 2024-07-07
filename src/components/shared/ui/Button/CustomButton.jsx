import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './extraSmallButtons.css';
import './smallButtons.css';
import './mediumButtons.css';
import './largeButtons.css';

//TODO: Handle event handlers on button. See Activate.
//TODO2: Unit test button on Activate page
export const CustomButton = ({ type, style, link, size, variant, children }) => {
  return (
    <Button type={type} className={classNames(style)} href={link} size={size} variant={variant}>
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string,
  style: PropTypes.string,
  link: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.any,
};
