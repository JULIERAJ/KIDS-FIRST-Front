import moment from 'moment';

import React, { useContext, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import EventContext from '@context/EventContext.jsx';

import { DayViewHeader, getOverlapCount } from '@utils/dateUtils.js';

import DayEvent from './DayEvent';
import MonthEvent from './MonthEvent';
import KFToolbar from './Toolbar';
import WeekEvent from './WeekEvent';

import '../styles/styles.css';

// Set up moment localizer
moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const KFCalendar = () => {
  const { filteredEventsData } = useContext(EventContext);
  const [activeView, setActiveView] = useState('month'); // State to manage active view

  // Define the handleCreateButtonClick function
  // eslint-disable-next-line no-unused-vars
  const handleCreateButtonClick = () => {
    // console.log('Create button clicked!');
    // Additional logic for creating a new event
  };

  // Event property getter to adjust the style based on overlapping events
  const eventStyleGetter = (event, start, end, isSelected, allEvents) => {
    const overlapCount = getOverlapCount(event, allEvents);
    // const widthPercentage = 100 / overlapCount;
    // Check if the current view is 'day'
    if (activeView === 'day') {
      return {
        className: 'day-view-event',
        style: {
          '--event-count': overlapCount, // Set the CSS variable locally
          // eslint-disable-next-line quotes
          width: `calc(100% / var(--event-count))`, // Use the local CSS variable
          height: '100%',
          position: 'absolute',
          overflow: 'hidden',
        },
      };
    } else if (activeView === 'week') {
      return {
        className: 'week-view-event',
        style: {
          '--event-count': overlapCount, // Set the CSS variable locally
          // eslint-disable-next-line quotes
          width: `calc(100% / var(--event-count))`, // Use the local CSS variable
          height: '100%',
          position: 'absolute',
          overflow: 'hidden',
        },
      };
    }
  };

  const handleViewChange = (view) => {
    setActiveView(view); // Update active view state
  };

  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        day: { event: DayEvent },
        week: { header: DayViewHeader, event: WeekEvent },
        month: { event: MonthEvent },
        toolbar: (props) => (
          <KFToolbar
            {...props}
            activeView={activeView}
            onViewChange={handleViewChange}
            handleCreateButtonClick={handleCreateButtonClick} // Pass the function as a prop
          />
        ),
      },
      defaultDate: new Date(),
    }),
    [activeView]
  );

  return (
    <div style={{ height: 'calc(100vh - 174px)' }}>
      <Calendar
        events={filteredEventsData}
        step={15}
        localizer={localizer}
        views={{
          day: true,
          week: true,
          month: true,
        }}
        components={components}
        defaultDate={defaultDate}
        onViewChange={handleViewChange}
        popup={true}
        eventPropGetter={(event, start, end, isSelected) =>
          eventStyleGetter(event, start, end, isSelected, filteredEventsData)
        }
      />
    </div>
  );
};

export default KFCalendar;
