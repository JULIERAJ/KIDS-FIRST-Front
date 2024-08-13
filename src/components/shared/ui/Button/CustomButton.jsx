import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './buttonStyles.css';
import './buttonSizes.css';
import './contentStyles.css';

export const CustomButton = ({
  styles,
  size,
  link,
  iconLeft,
  iconRight,
  iconLeftStyles,
  iconRightStyles,
  textStyles,
  children,
  ...props
}) => {
  return (
    <Button className={classNames(styles, size)} href={link} {...props}>
      {iconLeft && (
        <img
          src={iconLeft}
          className={classNames('icon-left', iconLeftStyles)}
        />
      )}
      <span className={classNames('text', textStyles)}>{children}</span>
      {iconRight && (
        <img
          src={iconRight}
          className={classNames('icon-right', iconRightStyles)}
        />
      )}
    </Button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string,
  styles: PropTypes.string,
  size: PropTypes.oneOf[('xsml', 'sml', 'med', 'lg')],
  iconLeft: PropTypes.string,
  iconLeftStyles: PropTypes.string,
  iconRight: PropTypes.string,
  iconRightStyles: PropTypes.string,
  textStyles: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.any,
};
