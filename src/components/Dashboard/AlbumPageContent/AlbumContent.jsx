import React, { useState, } from 'react';
import { Container, ProgressBar, Row, Col, Dropdown } from 'react-bootstrap';

import DeleteMessageModal from '@components/shared/Modal/DeleteMessageModal';
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import CircleWrapper from '@media/icons/circle-wrapper.svg';
import Circle from '@media/icons/circle.svg';
import { ReactComponent as Delete } from '@media/icons/delete.svg';
import { ReactComponent as Expand } from '@media/icons/expand-more.svg';
import IMG5117 from '@media/icons/img-5117.svg';
import IMG5122 from '@media/icons/img-5122.svg';
import IMG5123 from '@media/icons/img-5123.svg';
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
  const [highlightedImage, setHighlightedImage] = useState(null); 

  // Handle Select button click (show circle overlay for all images)
  const handleSelectClick = () => {
    const allImages = data[0].images;
    setShowCircleOverlay(true);
    setIsSelectVisible(false);
    setHighlightedImage(allImages);
  };

  // Handle Cancel button click in sub-header (reset all selections)
  const handleCancelClick = () => {
    setShowCircleOverlay(false);
    setIsSelectVisible(true);
    setHighlightedImage(data.images); // Reset highlighted image when canceled
  };

  // Handle Delete button click to show modal and hide Cancel button in sub-header
  const handleDeleteClick = () => {
    setShowCircleOverlay(false);
    setDeleteModalOpen(true);
    setIsCancelVisible(false); 
  };

  // Close modal and reset Cancel button visibility in sub-header
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setIsCancelVisible(true); 
  };

  // Handle unique image click to show CircleWrapper on the selected image
  const handleImageClick = (uniqueKey) => {
    setHighlightedImage(uniqueKey);
  };

  return (
    <Container fluid className={styles['page-window']}>
      <Row className={styles['sub-header']}>
        <Col>
          <p>Storage</p>
          <ProgressBar
            className={styles['image-progress-bar']}
            now={now}
            label={`${now}%`}
            visuallyHidden
          >
            <div className="progress-bar" style={{ backgroundColor: '#DB5C00', width: `${now}%` }} />
          </ProgressBar>
          <p>X MB of Y MB used</p>
        </Col>
        <Col xs="auto">
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
                  iconLeft={<Delete className={styles['delete-icon']} />}
                  className={`secondary-light xsml ${styles['custom-button-delete']}`}
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
        </Col>
        <Col xs="auto">
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
              <Dropdown.Item href="/newest">Newest</Dropdown.Item>
              <Dropdown.Item href="/oldest">Oldest</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row className={styles['image-section']}>
        {data.map((section, monthIndex) => (
          <>
            <p className={styles['month-text-style']}>{section.title}</p>
            <Row md={4} key={monthIndex} className={styles['image-styles']}>
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
          </>
        ))}
      </Row>

      {isDeleteModalOpen && (
        <DeleteMessageModal
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
