// eslint-disable-next-line import/order
import React, { useState } from 'react';
// eslint-disable-next-line import/order
import { Container, ProgressBar, Row, Col, Dropdown } from 'react-bootstrap';

// eslint-disable-next-line import/order, import/no-unresolved
import ConfirmationModal from '@components/shared/Modal/ConfirmationModal';
// eslint-disable-next-line import/order, import/no-unresolved
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
// eslint-disable-next-line import/order, import/no-unresolved
import CircleWrapper from '@media/icons/circle-wrapper.svg';
// eslint-disable-next-line import/order, import/no-unresolved
import Circle from '@media/icons/circle.svg';
// eslint-disable-next-line import/no-unresolved
import { ReactComponent as Delete } from '@media/icons/delete.svg';
// eslint-disable-next-line import/no-unresolved
import { ReactComponent as Expand } from '@media/icons/expand-more.svg';
// eslint-disable-next-line import/no-unresolved
import IMG5117 from '@media/icons/img-5117.svg';
// eslint-disable-next-line import/no-unresolved
import IMG5122 from '@media/icons/img-5122.svg';
// eslint-disable-next-line import/no-unresolved
import IMG5123 from '@media/icons/img-5123.svg';
// eslint-disable-next-line import/no-unresolved
import IMG8847 from '@media/icons/pic8847.svg';

import styles from './AlbumContent.module.css';

const AlbumContent = () => {
  const now = 40;
  const data = [
    {
      title: 'September 2024',
      images: [
        { src: IMG5122, alt: 'IMG-5122' },
        { src: IMG5123, alt: 'IMG-5123' },
        { src: IMG8847, alt: 'IMG-8847' },
        { src: IMG8847, alt: 'IMG-8847' },
      ]
    },
    {
      title: 'August 2024',
      images: [
        { src: IMG5122, alt: 'IMG-5122' },
        { src: IMG5117, alt: 'IMG-5117' },
        { src: IMG8847, alt: 'IMG-8847' },
      ]
    },
    {
      title: 'July 2024',
      images: [
        { src: IMG5122, alt: 'IMG-5122' },
        { src: IMG5117, alt: 'IMG-5117' },
        { src: IMG8847, alt: 'IMG-8847' },
      ]
    }
  ];

  const [isSelectVisible, setIsSelectVisible] = useState(true);
  const [showCircleOverlay, setShowCircleOverlay] = useState(false);
  const [isCancelVisible, setIsCancelVisible] = useState(true);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [highlightedImage, setHighlightedImage] = useState(false);
  const [isImageClickable, setIsImageClickable] = useState(false); 

  // Handle Select button click (show circle overlay for all images)
  const handleSelectClick = () => {
    const allImages = data[0].images;
    setShowCircleOverlay(true);
    setIsSelectVisible(false);
    setHighlightedImage(allImages);
    setIsImageClickable(true); 
  };

  // Handle Cancel button click in sub-header (reset all selections)
  const handleCancelClick = () => {
    setShowCircleOverlay(false);
    setIsSelectVisible(true);
    setHighlightedImage(null); 
    setIsImageClickable(false); 
  };

  // Handle Delete button click to show modal and hide Cancel button in sub-header
  const handleDeleteClick = () => {
    setShowCircleOverlay(false);
    setDeleteModalOpen(true);
  };

  // Close modal and reset Cancel button visibility in sub-header
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setIsCancelVisible(true);
    setShowCircleOverlay(true);
  };

  // Handle unique image click to show CircleWrapper on the selected image
  const handleImageClick = (uniqueKey) => {
    if (isImageClickable) { // Only allow clicking if enabled
      setHighlightedImage(uniqueKey);
    }
  };

  return (
    <Container fluid className={styles['page-window']}>
      <Row >
        <div className={styles['sub-header']}>
          <div className={styles['progress-bar-container']}>
            <p className={styles['storage-text']}>Storage</p>
            <ProgressBar
              className={styles['image-progress-bar']}
              now={now}
              label={`${now}%`}
              visuallyHidden
            >
              <div className="progress-bar" style={{ backgroundColor: '#EB7005', width: `${now}%` }} />
            </ProgressBar>
            <p style={{ margin: '-5px 0' }}>X MB of Y MB used</p>
          </div>
          <div className={styles['action-buttons-container']}>
            <div>
              <Dropdown>
                {isSelectVisible ? (
                  <Dropdown.Toggle
                    as={CustomButton}
                    className={`secondary-light xsml ${styles['custom-button-select']}`}
                    id="dropdown-basic"
                    onClick={handleSelectClick}
                  >
                    <p className={styles['text-style']}>Select</p>
                  </Dropdown.Toggle>
                ) : (
                  <div className={styles['dropdown-horizontal']}>
                    <Dropdown.Item
                      as={CustomButton}
                      iconLeft={<Delete />}
                      className={`xsml ${styles['custom-button-delete']}`}
                      onClick={handleDeleteClick}
                    >
                      <p className={styles['text-style']}>Delete</p>
                    </Dropdown.Item>
                    {isCancelVisible && (
                      <Dropdown.Item
                        as={CustomButton}
                        className={`secondary-light xsml ${styles['custom-button-cancel']}`}
                        onClick={handleCancelClick}
                      >
                        <p className={styles['text-style']}>Cancel</p>
                      </Dropdown.Item>
                    )}
                  </div>
                )}
              </Dropdown>
            </div>
            <div className="d-flex justify-content-end">
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomButton}
                  iconRight={<Expand />}
                  className={`secondary-light xsml ${styles['custom-button-sort']}`}
                  id="dropdown-basic"
                >
                  Sort
                </Dropdown.Toggle>
                <Dropdown.Menu className={`${styles['dropdown-vertical']} ${styles['dropdown-menu-width']}`}>
                  <Dropdown.Item href="/newest" className={styles['drop-down-text']}>Newest</Dropdown.Item>
                  <Dropdown.Item href="/oldest" className={styles['drop-down-text']}>Oldest</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </Row>

      <Row className={styles['image-section-container']}>
        {data.map((section, monthIndex) => (
          <React.Fragment key={monthIndex}>
            <p className={styles['month-text-style']}>{section.title}</p>
            <Row md={4} className={styles['image-styles']}>
              {section.images.map((image, index) => {
                const uniqueKey = `${section.title}-${index}`;
                return (
                  <Col key={index} sm>
                    <div
                      className={styles['image-container']}
                      onClick={() => handleImageClick(uniqueKey)}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        style={{ width: '200px', height: '236px' }}
                        className={
                          showCircleOverlay && highlightedImage === uniqueKey
                            ? styles['selected-image']
                            : ''
                        }
                      />
                      {/* Overlay Circle icon when image is selected */}
                      {(showCircleOverlay || highlightedImage === uniqueKey) && (
                        <img
                          src={Circle}
                          alt="Circle Icon"
                          className={styles['circle-overlay']}
                        />
                      )}
                      {/* Show CircleWrapper only if this image is highlighted */}
                      {highlightedImage === uniqueKey && (
                        <img
                          src={CircleWrapper}
                          alt="CircleWrapper Icon"
                          className={styles['circle-wrapper-overlay']}
                        />
                      )}
                    </div>
              
                  </Col>
                );
              })}
            </Row>
          </React.Fragment>
        ))}
       
      </Row>

      {isDeleteModalOpen && (
        <ConfirmationModal
          onClose={closeDeleteModal}
          message={
            <>
              Deleting file(s) will also remove them from messages.<br />
              Are sure you want to delete?
            </>
          }
          rightButtonText="Delete"
          onRightButtonClick={() => {
            // Implement delete logic here
            closeDeleteModal();
          }}
          leftButtonText="Cancel"
          onLeftButtonClick={closeDeleteModal}
          isLeftButton={true}
        />
      )}
    </Container>
  );
};

export default AlbumContent;
