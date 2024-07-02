import PropTypes from 'prop-types';
import React from 'react';
import '../../styles/viewStyles.css';

import styles from './WeekEvent.module.css';

const WeekEvent = ({ event }) => {
  const { color, kidsName, title, start, end } = event;

  const circleStyle = {
    '--circle-bg-color': color,
  };

  const boxStyle = {
    '--box-bg-color': `${color}4D`,
    '--box-border-color': color,
  };

  const getTruncatedTitle = (title) => {
    if (title.length <= 11) {
      return title;
    }
    return title.substring(0, 11) + '...';
  };

  const truncatedTitle = getTruncatedTitle(title);

  // Function to format date and time
  const formatEventTime = (startDate, endDate) => {
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const startTime = startDate.toLocaleTimeString('en-GB', timeOptions);
    const endTime = endDate.toLocaleTimeString('en-GB', timeOptions);
    return `${startTime} - ${endTime}`;
  };
  return (
    <div className={`${styles.box} event-box`} style={boxStyle}>
      <div className={`${styles['content-wrapper']} content-wrapper}`}>
        {truncatedTitle && (
          <span className={styles.title}>{truncatedTitle}</span>
        )}
        <div className={styles.timing}>
          {start && end && <span>{formatEventTime(start, end)}</span>}
        </div>
      </div>
      <div></div>
      <span className={`${styles.circle} circle`} style={circleStyle}>
        {kidsName && kidsName.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

WeekEvent.propTypes = {
  event: PropTypes.object.isRequired,
};

export default WeekEvent;
