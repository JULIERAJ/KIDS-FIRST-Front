import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';

import { FaCircle } from 'react-icons/fa6';

const customStyles = {
  yellow: {
    backgroundColor: '#ffeb3b', // or any yellow you like
    color: 'black', // default text color for non-Saturday yellow cards
  },
  red: {
    backgroundColor: '#f44336', // or any red you like
  },
  purple: {
    backgroundColor: '#9c27b0', // or any purple you like
  },
  grey: {
    backgroundColor: '#D3D3D3', // Bootstrap grey
  },
  orange: {
    backgroundColor: '#fd7e14', // or any orange you like
    color: 'white', // white text color for Saturday
  },
};
const DayCard = ({ day, date, events, isToday }) => {
  const headerColor = isToday ? customStyles.orange : customStyles.grey;
  const textColor = isToday ? 'white' : 'black';

  return (
    <Card
      style={{
        flex: '1 1 230px',
        borderRadius: '24px',
        marginTop: '10px',
        maxWidth: '230px',
        minWidth: '140px',
        width: '100%',
        height: '245px',
      }}>
      <Card.Header
        className='text-center'
        style={{
          ...headerColor,
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          height: '60.6px',
          width: '100%',
        }}>
        <div
          style={{
            fontSize: '22px',
            fontWeight: '600',
            lineHeight: '25.78px',
            color: textColor, // text color for today and other days
          }}>
          {day}
        </div>
        <div
          style={{
            fontSize: '18px',
            fontWeight: '400',
            lineHeight: '21.09px',
            color: textColor, // text color for today and other days
          }}>
          {date}
        </div>
      </Card.Header>
      <Card.Body>
        {events.map((event) => (
          <div key={event.id} className='d-flex'>
            <FaCircle
              style={{ width: '10.8px', height: '11px' }}
              color={event.color}
              className='me-2 mt-1 align-self-start'
            />
            <div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'gray',
                  fontWeight: '200',
                }}>
                {event.time}
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '400',
                }}>
                {event.title}
              </div>
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  isToday: PropTypes.bool.isRequired,
};

export default DayCard;
