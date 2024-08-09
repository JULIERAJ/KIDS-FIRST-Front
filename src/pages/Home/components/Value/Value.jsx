import PropTypes from 'prop-types';

import styles from './Value.module.css';

const Value = ({ title, text, img }) => {
  return (
    <div className={`${styles.value} value`}>
      <h2 className={styles['value-title']}>{title}</h2>
      <p className={styles['value-text']}>{text}</p>
      <img
        src={img}
        alt=""
        className={styles['value-img']}
      />
    </div>
  );
};

Value.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  img: PropTypes.string
};

export default Value;
