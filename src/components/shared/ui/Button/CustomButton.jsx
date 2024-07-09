import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';

import './buttonStyles.css';
import './buttonSizes.css';
import './contentStyles.css';

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
        <img src={iconLeft} className={classNames('icon-left', iconLeftStyles)} />
      )}
      <span className='text'>{children}</span>
      {iconRight && (
        <img src={iconRight} className={classNames('icon-right', iconRightStyles)} />
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
          <img src={iconLeft} className={classNames('icon-left', iconLeftStyles)} />
        )}
        <span className='text'>{children}</span>
        {iconRight && (
          <img src={iconRight} className={classNames('icon-right', iconRightStyles)} />
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
