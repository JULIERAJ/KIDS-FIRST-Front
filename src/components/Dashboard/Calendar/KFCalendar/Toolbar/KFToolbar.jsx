import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';

import EventContext from '@context/EventContext';

import EventModal from '../EventModal';

import events from '../events.js';

import styles from './KFToolbar.module.css';

const KFToolbar = ({
  activeView,
  onViewChange,
  label,
  views,
  onNavigate,
  handleCreateButtonClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewButtonClick = (view) => {
    onViewChange(view);
  };

  const { setFilteredEventsData } = useContext(EventContext);

  const [selectedChildren, setSelectedChildren] = useState([]);

  const handleFilterEvents = (kidName) => {
    let updatedChildren;

    if (selectedChildren.includes(kidName)) {
      // If already selected, remove from selectedChildren
      updatedChildren = selectedChildren.filter((child) => child !== kidName);
    } else {
      // If not selected, add to selectedChildren
      updatedChildren = [...selectedChildren, kidName];
    }

    // Filter events based on selectedChildren
    const filteredEvents = events.filter((event) =>
      updatedChildren.includes(event.kidsName)
    );
    setFilteredEventsData(filteredEvents);

    setSelectedChildren(updatedChildren);
  };

  // Get unique kid names
  const uniqueKidNames = events.reduce((acc, event) => {
    if (!acc.some((e) => e.kidsName === event.kidsName)) {
      acc.push({ kidsName: event.kidsName, eventId: event.id });
    }
    return acc;
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles['KF-toolbar']}>
      <div className={styles.toolbar}>
        <div className='rbc-btn-group'>
          <button
            type='button'
            onClick={() => onNavigate('PREV')}
            style={{
              background: '#D6D9D9',
              width: '35px',
              height: '35px',
              border: 'none',
              borderRadius: '50px',
            }}>
            <span>&lt;</span>
          </button>
          <button
            type='button'
            onClick={() => onNavigate('NEXT')}
            style={{
              background: '#D6D9D9',
              width: '35px',
              height: '35px',
              border: 'none',
              borderRadius: '50px',
            }}>
            <span>&gt;</span>
          </button>
        </div>

        <div className={styles['rbc-toolbar-label']}>{label}</div>

        {/* Container for buttons */}
        <div className={styles.buttonsContainer}>
          {/* Big button */}
          <div className={styles.bigButtonContainer}>
            <div
              onClick={handleCreateButtonClick}
              className={styles.bigButton}
              style={{ border: '2px solid #EB7005' }}>
              {/* smaller buttons inside big button */}
              <div className={styles.smallButtonsContainer}>
                {views.map((view) => (
                  <button
                    key={view}
                    type='button'
                    onClick={() => handleViewButtonClick(view)}
                    className={`${styles.controlButton} 
                      ${activeView === view ? 'active' : ''}`}
                    style={{
                      backgroundColor:
                        activeView === view ? '#FCFCFC' : 'transparent',
                      color: activeView === view ? '#EB7005' : '',
                      border:
                        activeView === view ? '2px solid #EB7005' : 'none',
                    }}>
                    {/* Change button text based on view */}
                    {view === 'day'
                      ? 'Daily'
                      : view === 'week' ? 'Weekly' : 'Monthly'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Create button */}
          <button
            onClick={() => {
              openModal();
              handleCreateButtonClick();
            }}
            className={styles.createButton}>
            Create&nbsp;
            <div style={{ width: '8px', height: '8px', marginBottom: '20px' }}>
              <FiPlus />
            </div>
          </button>
        </div>
      </div>

      {/* Container for kid events */}
      <div className={styles['kid-events-container']}>
        {/* Iterate over unique kid names and create circles */}
        {uniqueKidNames.map(({ eventId, kidsName }) => {
          // Find the first event with the current kid's name
          const event = events.find((event) => event.kidsName === kidsName);
          return event ? (
            <div className={styles.wrapper} key={eventId}>
              <div
                className={styles.circle}
                style={{ backgroundColor: event.color }}>
                <span className={styles.initial}>{kidsName.charAt(0)}</span>
              </div>
              <div className={styles['info-wrapper']}>
                <p className={styles['kid-name']}>{kidsName}</p>
                {/* Toggle button */}
                <button
                  className={styles['toggle-event-button']}
                  onClick={() => handleFilterEvents(kidsName)}>
                  {' '}
                  {selectedChildren.includes(kidsName) ? (
                    <AiOutlineClose />
                  ) : (
                    <FiPlus />
                  )}
                </button>
              </div>
            </div>
          ) : null;
        })}
      </div>
      {isModalOpen && <EventModal onClose={closeModal} />}
    </div>
  );
};

// Prop types validation
KFToolbar.propTypes = {
  activeView: PropTypes.string.isRequired,
  onViewChange: PropTypes.func,
  label: PropTypes.string,
  views: PropTypes.array,
  onNavigate: PropTypes.func,
  handleCreateButtonClick: PropTypes.func,
};

export default KFToolbar;
