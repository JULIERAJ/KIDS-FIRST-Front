import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './buttonStyles.css';
import './buttonSizes.css';
import './textStyles.css';

//TODO: Handle event handlers on button. See Activate.
//TODO2: Unit test button on Activate page
export const CustomButton = ({ type, styles, link, size, variant, children }) => {
  return (
    <Button type={type} className={classNames(styles)} href={link} size={size} variant={variant}>
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string,
  styles: PropTypes.string,
  link: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.any,
};
