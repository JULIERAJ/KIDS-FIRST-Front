import PropTypes from 'prop-types';

import styles from './DayEvent.module.css';

const getColorForBackground = (name) => {
  // Check if name is valid (not null or undefined)
  if (name && typeof name === 'string' && name.length > 0) {
    const colorsBackground = {
      A: 'rgba(255, 214, 102, 0.5)',
      B: 'rgba(255, 107, 109, 0.5)',
      C: 'rgba(213, 202, 235, 0.5)',
      E: 'rgba(0, 0, 0, 0.5)',
    };
    return colorsBackground[name.charAt(0).toUpperCase()] || 'rgba(0, 0, 0, 0)';
  } else {
    // Handle invalid name (e.g., return a default color)
    return 'rgba(0, 0, 0, 0)';
  }
};

const DayEvent = ({ event }) => {
  const { title, color, kidsName, image, image2, timing } = event;

  const circleStyle = {
    '--circle-bg-color': color,
  };

  const boxStyle = {
    backgroundColor: getColorForBackground(kidsName),
    '--box-bg-color': color,
  };

  return (
    <>
      <div className={styles['event-box']} style={boxStyle}>
        <div className={styles['content-wrapper']}>
          <div className={styles.title}>{title && <span>{title} </span>}</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={image}
              alt='icon'
              style={{ marginLeft: '85%', marginRight: '15px' }}
            />

            <img src={image2} alt='icon' />
          </div>
          <div className={styles.timing}>
            {timing && <span style={{ marginLeft: '63%' }}>{timing}</span>}
          </div>
        </div>
        <span className={styles.circle} style={circleStyle}>
          {kidsName && kidsName.charAt(0).toUpperCase()}
        </span>
      </div>
    </>
  );
};
DayEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    kidsName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    image2: PropTypes.string.isRequired,
    timing: PropTypes.string.isRequired,
  }).isRequired,
};

export default DayEvent;
