import { useFormik } from 'formik';
import { useState } from 'react';
import { Col, Form, Row, Image } from 'react-bootstrap';

import { createKid } from '@api';
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import edit from '@media/icons/icon.png';

import AttributesSelect from './AttributesSelect';
import { ALLERGIES_VALUE } from './constants/allergies';
import { FEARS_VALUE } from './constants/fears';
import { INTEREST_VALUE } from './constants/interests';
import kid from './kid.png';
import styles from './KidForm.module.css';
import { kidValidateSchema } from './kidValidateSchema';

const KidForm = () => {
  const [countSymbol, setCountSymbol] = useState('');

  async function formAction(values) {
    try {
      const response = await createKid(values);
      console.log('Kid created:', response.data);
    } catch (error) {
      // Improved error logging
      console.error('Error occurred:', error.message);
      if (error.response) {
        console.error(
          'Server responded with:',
          error.response.status,
          error.response.data
        );
      } else {
        console.error('No response from server');
      }
    }
  }
  const formik = useFormik({
    initialValues: {
      childColor: 'purple', // hardcoded
      name: '',
      dateOfBirthday: '',
      allergies: [],
      interests: [],
      fears: [],
      other: '',
    },
    validationSchema: kidValidateSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('Collected form values:', values);

      formAction(values);

      setTimeout(() => {
        resetForm();
      }, 1000 * 2);
    },
  });

  const handleCountSymbol = (event) => {
    setCountSymbol(event.target.value);
  };
  return (
    <Form onSubmit={formik.handleSubmit} className='mt-4'>
      <Row className='flex align-items-center'>
        <Col xs={3} className={styles['kid-avatar-container']}>
          <Image src={kid} width={158} height={158} roundedCircle />
          <Image
            src={edit}
            alt='edit kid avatar'
            className={styles['kid-edit-avatar']}
          />
        </Col>
        <Col xs={4}>
          <Form.Label>Kid&apos;s Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Full Name'
            className='p-3'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.name}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.errors.name}
          </Form.Control.Feedback>
        </Col>
        <Col xs={3}>
          <Form.Label>Birth Date</Form.Label>
          <Form.Control
            type='text'
            placeholder='MM/DD/YY'
            className='p-3'
            name='dateOfBirthday'
            value={formik.values.dateOfBirthday}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.dateOfBirthday}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.errors.dateOfBirthday}
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row>
        <Col xs={3}></Col>
        <Col xs={7}>
          <h4>More Information</h4>
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
              label='Fears'
              options={FEARS_VALUE}
              value={formik.values.fears}
              setFieldValue={formik.setFieldValue}
              name='fears'
              error={formik.errors.fears}
            />

            <AttributesSelect
              label='Interests'
              options={INTEREST_VALUE}
              value={formik.values.interests}
              setFieldValue={formik.setFieldValue}
              name='interests'
              error={formik.errors.interests}
            />

            <Form.Label className={styles['kid-form-label']}>Other</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              className='p-3'
              value={formik.values.other}
              name='other'
              onChange={(e) => {
                formik.handleChange(e);
                handleCountSymbol(e);
              }}
              placeholder='Here you can write additional information...'
            />
            <div className='d-flex justify-content-end'>
              <Form.Text className='text-muted'>
                {countSymbol.length}/200
              </Form.Text>
            </div>
          </Form.Group>
        </Col>
      </Row>
      <div className='d-flex justify-content-end mt-3'>
        <CustomButton
          className={`primary-light ${styles['custom-button']}`}
          size='med'
          type='button'
          variant='light'
          onClick={() => formik.resetForm()}>
          Cancel
        </CustomButton>
        <CustomButton
          type='submit'
          className={`primary-light ${styles['custom-button']}`}
          size='med'
          variant='light'>
          Save
        </CustomButton>
      </div>
    </Form>
  );
};

export default KidForm;
