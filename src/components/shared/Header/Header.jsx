import PropTypes from 'prop-types';
import { Container, Image, Navbar } from 'react-bootstrap';

import logo from '@media/logo/LOGO-BYME.png';

import styles from './Header.module.css';

const Header = ({ widget }) => {
  return (
    <Navbar className="py-1">
      <Container className={styles['logo-container']}>
        <Navbar.Brand href="/">
          <Image src={logo} className={styles.logo} alt="KIDS FIRST"/>
        </Navbar.Brand>

        {widget}
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  widget: PropTypes.element,
};

export default Header;
