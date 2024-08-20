import { Row, Col } from 'react-bootstrap';

import DayCard from './DayCard';
const WeeksOverview = () => {
  const days = [
    {
      id: 1,
      day: 'Mon',
      date: 'Nov 02',
      events: [
        {
          id: '1',
          time: '09:00 - 09:30 AM',
          title: 'Parent-Teacher Meeting',
          color: '#FAE3AA',
        },
      ],
    },
    {
      id: 2,
      day: 'Tue',
      date: 'Nov 03',
      events: [
        {
          id: '2',
          time: '08:00 - 11:00 AM',
          title: 'Field Trip',
          color: '#FF6B6D',
        },
        {
          id: '3',
          time: '05:00 - 06:00 PM',
          title: 'Doctor Appointment',
          color: '#C29EEF',
        },
      ],
    },
    {
      id: 3,
      day: 'Wed',
      date: 'Nov 04',
      events: [
        {
          id: '4',
          time: '12:00 - 02:00 PM',
          title: 'Play Rehearsal',
          color: '#FAE3AA',
        },
      ],
    },
    {
      id: 4,
      day: 'Thu',
      date: 'Nov 05',
      events: [
        {
          id:'5',
          time: '08:00 - 11:00 AM',
          title: 'Field Trip',
          color: '#FF6B6D',
        },
      ],
    },
    {
      id: 5,
      day: 'Fri',
      date: 'Nov 06',
      events: [
        {
          id: '6',
          time: '12:30 - 01:30 PM',
          title: 'Soccer Practice',
          color: '#FF6B6D',
        },
      ],
    },
    {
      id: 6,
      day: 'Sat',
      date: 'Nov 07',
      events: [
        {
          id: '7',
          time: '12:30 - 01:30 PM',
          title: 'Soccer Practice',
          color: '#FF6B6D',
        },
      ],
    },
  ];

  const today = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
  const formattedDate = formatter.format(today).replace(/,/g, '');
  const todayParts = formattedDate.split(' ');

  // Define today's events
  const todayEvents = [
    { id: '8', time: '08:00 - 11:00 AM', title: 'Field Trip', color: '#FF6B6D' },
  ];

  // Add today's date to the days array
  days.unshift({
    id: 0,
    day: todayParts[0],
    date: `${todayParts[1]} ${todayParts[2]}`,
    events: todayEvents,
  });

  return (
    <>
      <h5
        style={{
          fontFamily: 'Roboto',
          fontWeight: '500',
          fontSize: '16px',
          lineHeight: '18.75px',
        }}>
        Calendar
      </h5>
      <p
        style={{
          fontFamily: 'Roboto',
          fontWeight: '300',
          fontSize: '16px',
          lineHeight: '18.75px',
        }}>
        Overview of this week’s events.
      </p>
      <Row className='flex-nowrap' style={{ overflowX: 'auto' }}>
        {days.map((day) => (
          <Col key={day.id} style={{ flex: 1, minWidth: '160px' }}>
            <DayCard
              day={day.day}
              date={day.date}
              events={day.events}
              isToday={day.id === 0} // today is always the first element in the array
            />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default WeeksOverview;
