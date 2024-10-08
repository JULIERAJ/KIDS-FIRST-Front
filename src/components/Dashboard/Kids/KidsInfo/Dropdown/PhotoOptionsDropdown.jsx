import PropTypes from 'prop-types';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import styles from './PhotoOptionsDropdown.module.css';

const PhotoOptionsDropdown = ({ onSelect, children }) => {
  // State to track the active item
  const [activeKey, setActiveKey] = useState(null);

  const handleSelect = (key) => {
    setActiveKey(key);
    onSelect(key);
  };

  return (
    <Dropdown>
      <Dropdown.Menu show className={styles.dropdownMenu}>
        <Dropdown.Item
          eventKey="upload"
          className={`${styles.dropdownItem} ${activeKey === 'upload' ? styles.active : ''}`}
          onClick={() => handleSelect('upload')}
        >
          Upload Photo
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="changeColor"
          className={`${styles.dropdownItem} ${activeKey === 'changeColor' ? styles.active : ''}`}
          onClick={() => handleSelect('changeColor')}
        >
          Change Color
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="remove"
          className={`${styles.dropdownItem} ${activeKey === 'remove' ? styles.active : ''}`}
          onClick={() => handleSelect('remove')}
        >
          Remove Photo
        </Dropdown.Item>
      </Dropdown.Menu>

      {children} {/* Custom trigger element */}
    </Dropdown>
  );
};

PhotoOptionsDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default PhotoOptionsDropdown;
