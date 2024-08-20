import decline from '@media/icons/thumbs-down.png';
import accept from '@media/icons/thumbs-up.png';

import DayEvent from './DayEvent';

import styles from './PendingEvents.module.css';

const PendingEvents = () => {
  //data for events
  const events = [
    {
      id: 1,
      title: 'Soccer Practice',
      kidsName: 'A',
      timing: '5:00-6:00 PM   Wed, 21Sep',
      color: '#ffd666',
      image: decline,
      image2: accept,
    },
    {
      id: 2,
      title: 'Soccer Practice',
      kidsName: 'B',
      timing: '5:00-6:00 PM   Wed, 21Sep',
      color: '#ff6b6d',
      image: decline,
      image2: accept,
    },
    {
      id: 3,
      title: 'Soccer Practice',
      kidsName: 'C',
      timing: '5:00-6:00 PM   Wed, 21Sep',
      color: '#c29eef',
      image: decline,
      image2: accept,
    },
  ];

  return (
    <>
      <div className={styles['left-column']}>
        <h5>Pending Events</h5>
        <p>Events shared to you by your ex-partner</p>
        <div className={styles['event-boxes']}>
          {/* Render DayEvent component for each event */}
          {events.map((event) => (
            <DayEvent key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
};

// PendingEvents.propTypes = {
//   pendingMessages: PropTypes.array.isRequired, // Define prop types here
// };
export default PendingEvents;
