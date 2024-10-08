import PropTypes from 'prop-types';

import { Container } from 'react-bootstrap';

import { formatEventTime } from '@utils/dateUtils';

import styles from './DayEvent.module.css';

export const DayEvent = ({ event }) => {
  const { title, color, kidsName, start, end, desc, type } = event;

  const circleStyle = {
    '--circle-bg-color': color,
  };

  const boxStyle = {
    '--box-bg-color': `${color}4D`,
    '--border-left-color': color,
  };

  return (
    <Container className={styles.box} style={boxStyle}>
      <div className={styles['day-event-content-wrapper']}>
        <div className={styles.dayEventHeader}>
          {title && <span className={styles.title}>{title}</span>}
          {start && end && (
            <span className={styles.dayEventTiming}>
              {formatEventTime(start, end)}
            </span>
          )}
        </div>
        <div className={styles.desc}>{desc && <span>{desc}</span>}</div>
        <div style={{ fontSize: '14px', opacity: '0.4' }}>
          {type && (
            <span>
              {' '}
              <span
                style={{
                  fontFamily: 'Material Symbols Outlined',
                  fontSize: '18px',
                  lineHeight: '18px',
                  marginRight: '8px',
                  verticalAlign: 'middle',
                }}>
                {type.includes('Solo') ? 'person' : 'group'}
              </span>
              {type}
            </span>
          )}
        </div>
      </div>
      <span className={styles.circle} style={circleStyle}>
        {kidsName && kidsName.charAt(0).toUpperCase()}
      </span>
    </Container>
  );
};

DayEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    kidsName: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default DayEvent;
