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
    <div className={styles.box} style={boxStyle}>
      <span className={styles.circle} style={circleStyle}>
        {kidsName.charAt(0).toUpperCase()}
      </span>
      {truncatedTitle && <span className={styles.title}>{truncatedTitle}</span>}
    </div>
  );
};

MonthEvent.propTypes = {
  event: PropTypes.object.isRequired,
};

export default MonthEvent;
