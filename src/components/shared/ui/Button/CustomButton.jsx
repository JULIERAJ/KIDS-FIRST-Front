import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

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
