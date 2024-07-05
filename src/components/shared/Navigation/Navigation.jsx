import React from 'react';
import { Dropdown, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { navigationLink } from '@data/features.data';

import arrowDown from '@media/features/arrow_down.svg';

import { CustomButton } from '../ui/Button/CustomButton';

import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <>
      <Nav className={styles.navigation}>
        {navigationLink.map((link, i) => {
          return (
            <Nav.Link
              key={i}
              as={NavLink}
              to={link.url}
              className={styles.navigation__item}>
              {link.title}
            </Nav.Link>
          );
        })}
      </Nav>
      <Container className={styles.navigation__wrapper}>
        <Dropdown>
          <Dropdown.Toggle
            className={styles.navigation__lang_menu}
            id='langDropdown'
            size='sm'>
            EN
            <img
              src={arrowDown}
              alt='Arrow Down'
              className={styles.navigation__lang_arrow}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu className={styles.navigation__lang_menu}>
            <CustomButton type='button' style={styles.navigation__lang_option}>
              FR
            </CustomButton>
          </Dropdown.Menu>
        </Dropdown>
        <CustomButton style={styles.navigation__login_button}>
          <NavLink to='/signin'>Log in</NavLink>
        </CustomButton>
        <CustomButton style={styles.navigation__signup_button}>
          <NavLink to='/register'>Sign up</NavLink>
        </CustomButton>
      </Container>
    </>
  );
};

export default Navigation;
