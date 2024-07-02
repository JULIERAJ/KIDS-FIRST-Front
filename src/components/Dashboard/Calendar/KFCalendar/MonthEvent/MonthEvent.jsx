import PropTypes from 'prop-types';

import '../../styles/styles.css';

import styles from './MonthEvent.module.css';
const MonthEvent = ({ event }) => {
  const { color, kidsName, title } = event;

  const circleStyle = {
    '--circle-bg-color': color,
  };

  const boxStyle = {
    '--box-bg-color': `${color}4D`,
    '--box-border-left-color': color,
  };

  const getTruncatedTitle = (title) => {
    if (title.length <= 11) {
      return title;
    }
    return title.substring(0, 11) + '...';
  };

  const truncatedTitle = getTruncatedTitle(title);

  return (
    <div className='rbc-event-content'>
      <div className={`${styles.box} kid-events-container`} style={boxStyle}>
        <span className={`${styles.circle} circle`} style={circleStyle}>
          {kidsName.charAt(0).toUpperCase()}
        </span>
        {truncatedTitle && (
          <span
            className={styles.title}
            style={{ marginLeft: '-30px', marginTop: '-5px' }}>
            {truncatedTitle}
          </span>
        )}
      </div>
    </div>
  );
};

MonthEvent.propTypes = {
  event: PropTypes.object.isRequired,
};

export default MonthEvent;
