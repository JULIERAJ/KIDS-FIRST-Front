import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export const CustomButton = ({ type, style, link, children }) => {
  return (
    <Button type={type} className={classNames(style)} href={link}>
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string,
  style: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.any,
};
