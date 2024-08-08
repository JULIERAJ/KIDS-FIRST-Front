import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// import { navigationLink } from '@data/features.data';

// import arrowDown from '@media/features/arrow_down.svg';

import { CustomButton } from '../ui/Button/CustomButton';

import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <>
      <Container className={styles.navigation__wrapper}>
        {/* <Dropdown>
          <Dropdown.Toggle
            className={styles.navigation__lang_menu}
            id='langDropdown'
            size='sm'
          >
            EN
            <img
              src={arrowDown}
              alt='Arrow Down'
              className={styles.navigation__lang_arrow}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu className={styles.navigation__lang_menu}>
            <CustomButton
              type='button'
              styles={styles.navigation__lang_button}
              textStyles={styles.navigation__lang_text}
            >
              FR
            </CustomButton>
          </Dropdown.Menu>
        </Dropdown> */}
        <CustomButton styles={styles.navigation__login_button}>
          <NavLink to='/signin'>Log in</NavLink>
        </CustomButton>
        <CustomButton styles={styles.navigation__signup_button}>
          <NavLink to='/register'>Sign up</NavLink>
        </CustomButton>
      </Container>
    </>
  );
};

export default Navigation;
