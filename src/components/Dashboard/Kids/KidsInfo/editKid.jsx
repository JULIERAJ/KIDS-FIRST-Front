//HERE IS FOR EDITING KID PROFILE particular button delete kid
// import edit from '@media/icons/edit.svg';

// import removeChild from '@media/icons/removeChild.svg';
{
  /* <div className='d-flex justify-content-between mx-5 mt-2'>
          {formik.values.name && formik.values.dateOfBirthday ? (
            <CustomButton
              iconLeft={removeChild}
              type='submit'
              styles='invisible-light'
              size='med'>
              Delete this profile
            </CustomButton>
          ) : (
            <div />
          )}

          <div className='d-flex mx-4'>
            <CustomButton
              styles='secondary-light mx-4'
              size='xsml'
              type='button'
              onClick={() => formik.resetForm()}>
              Cancel
            </CustomButton>
            <CustomButton type='submit' styles='primary-light' size='xsml'>
              Save
            </CustomButton>
          </div>
        </div> */
}
// External imports
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';

import { useParams } from 'react-router-dom';

import { getKidById, updateKid } from '@api';

import { CustomButton } from '@components/shared/ui/Button/CustomButton';

import AttributesSelect from './AttributesSelect';

import { ALLERGIES_VALUE } from './constants/allergies';
import { FEARS_VALUE } from './constants/fears';
import { INTEREST_VALUE } from './constants/interests';

import styles from './KidForm.module.css';

import { kidValidateSchema } from './kidValidateSchema';

const EditKid = ({ setFetchKidsCount, fetchKidsCount, openKidForm }) => {
  // Get ID from URL params
  const { id } = useParams(); 
  const [initialData, setInitialData] = useState(null);
  const [countSymbol, setCountSymbol] = useState('');

  useEffect(() => {
    if (id) {
      // Fetch data based on the ID in the URL
      fetchKidData(id); 
    }
  }, [id]);

  const fetchKidData = async (kidId) => {
    try {
      const response = await getKidById(kidId);
      setInitialData(response.data); 
      // Prefill the form with fetched data
      formik.setValues(response.data); 
    } catch (error) {
      console.error('Error fetching kid data:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      childColor: initialData?.childColor || 'yellow',
      name: initialData?.name || '',
      dateOfBirthday: initialData?.dateOfBirthday || '',
      allergies: initialData?.allergies || [],
      interests: initialData?.interests || [],
      fears: initialData?.fears || [],
      otherNotes: initialData?.otherNotes || '',
    },
    validationSchema: kidValidateSchema,
    enableReinitialize: true, 
    onSubmit: async (values) => {
      try {
        await updateKid(id, values); // Update kid profile by ID
        setFetchKidsCount(fetchKidsCount + 1);
      } catch (error) {
        console.error('Error updating kid:', error);
      }
    },
  });
  const handleCountSymbol = (e) => {
    const text = e.target.value;
    setCountSymbol(text);
  };

  return (
    <Container fluid>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col xs={4}>
            <Form.Label>Kid&apos;s Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Col>
          <Col xs={4}>
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              type="text"
              name="dateOfBirthday"
              value={formik.values.dateOfBirthday}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.dateOfBirthday}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.dateOfBirthday}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={7}>
            <h4 className="mb-2">More Information</h4>
            <p>Add items in the fields below to keep each other in the loop.</p>
            <Form.Group>
              <AttributesSelect
                label='Allergies'
                options={ALLERGIES_VALUE}
                value={formik.values.allergies}
                setFieldValue={formik.setFieldValue}
                name='allergies'
                error={formik.errors.allergies}
              />
              <AttributesSelect
                label='Interests'
                options={INTEREST_VALUE}
                value={formik.values.interests}
                setFieldValue={formik.setFieldValue}
                name='interests'
                error={formik.errors.interests}
              />
              <AttributesSelect
                label='Fears'
                options={FEARS_VALUE}
                value={formik.values.fears}
                setFieldValue={formik.setFieldValue}
                name='fears'
                error={formik.errors.fears}
              />
              <Form.Label className={styles['kid-form-label']}>
                Other
              </Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                className='p-3'
                value={formik.values.otherNotes}
                name='otherNotes'
                onChange={(e) => {
                  formik.handleChange(e);
                  handleCountSymbol(e);
                }}
                placeholder='Here you can write additional information...'
                isInvalid={!!formik.errors.otherNotes}
              />
              <div className='d-flex py-1'>
                <Form.Control.Feedback
                  type='invalid'
                  style={{ display: 'block', minHeight: '1.5em' }}
                >
                  {formik.errors.otherNotes}
                </Form.Control.Feedback>
                <Form.Text className='text-muted'>
                  {countSymbol.length}/200
                </Form.Text>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <div className='d-flex justify-content-end mt-4 mx-5'>
          <CustomButton
            styles='secondary-light mx-2'
            size='xsml'
            type='button'
            onClick={() => {
              formik.resetForm();
              openKidForm(false);
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            type='submit'
            styles='primary-light mx-2'
            size='xsml'
          >
            Save
          </CustomButton>
        </div>
      </Form>
    </Container>
  );
};

EditKid.propTypes = {
  openKidForm: PropTypes.func,
  setFetchKidsCount: PropTypes.func,
  fetchKidsCount: PropTypes.number
};

export default EditKid;
