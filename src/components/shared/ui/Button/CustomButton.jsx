import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';

import './buttonStyles.css';
import './buttonSizes.css';
import './contentStyles.css';

//TODO: Handle event handlers on button. See Activate.
//TODO2: Unit test button on Activate page
export const CustomButton = ({
  styles,
  link,
  iconLeft,
  iconRight,
  iconLeftStyles,
  iconRightStyles,
  children,
  ...props
}) => {
  return (
    <Button className={classNames(styles)} href={link} {...props}>
      {iconLeft && (
        <img src={iconLeft} className={classNames('icon_left', iconLeftStyles)} />
      )}
      <span className='text'>{children}</span>
      {iconRight && (
        <img src={iconRight} className={classNames('icon_right', iconRightStyles)} />
      )}
    </Button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string,
  styles: PropTypes.string,
  iconLeft: PropTypes.string,
  iconLeftStyles: PropTypes.string,
  iconRight: PropTypes.string,
  iconRightStyles: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.any,
};

export const NavButton = ({
  styles,
  link,
  iconLeft,
  iconRight,
  iconLeftStyles,
  iconRightStyles,
  children,
  ...props
}) => {
  return (
    <NavLink to={link}>
      <Button className={classNames(styles)} {...props}>
        {iconLeft && (
          <img src={iconLeft} className={classNames('icon_left', iconLeftStyles)} />
        )}
        <span className='text'>{children}</span>
        {iconRight && (
          <img src={iconRight} className={classNames('icon_right', iconRightStyles)} />
        )}
      </Button>
    </NavLink>
  );
};

NavButton.propTypes = {
  type: PropTypes.string,
  styles: PropTypes.string,
  iconLeft: PropTypes.string,
  iconLeftStyles: PropTypes.string,
  iconRight: PropTypes.string,
  iconRightStyles: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.any,
};
