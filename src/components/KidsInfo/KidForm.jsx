import { useFormik } from 'formik';
import { useState } from 'react';
import { Col, Form, Row, Image } from 'react-bootstrap';

import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import edit from '@media/icons/icon.png';

import { ALLERGIES_VALUE } from './constants/allergies';
import { FEARS_VALUE } from './constants/fears';
import { INTEREST_VALUE } from './constants/interests';
import kid from './kid.png';
import styles from './KidForm.module.css';
import { kidValidateSchema } from './kidValidateSchema';
const KidForm = () => {
  // const [loading, setLoading] = useState(false);
  const [countSymbol, setCountSymbol] = useState('');

  const formik = useFormik({
    initialValues: {
      fullName: '',
      dateOfBirthday: '',
      allergies: [],
      interests: [],
      fears: [],
      other: '',
    },
    validationSchema: kidValidateSchema,
    onSubmit: (value, { resetForm }) => {
      console.log(value);
      // setLoading(true);
      setTimeout(() => {
        // setLoading(false);
        resetForm();
      }, 1000 * 2);
    },
  });

  const handleCountSymbol = (event) => {
    setCountSymbol(event.target.value);
  };
  return (
    <Form onSubmit={formik.handleSubmit} className='mt-4'>
      <Row>
        <Col xs={3} className={styles['kid-avatar-container']}>
          <Image src={kid} width={158} height={158} roundedCircle />
          <Image
            src={edit}
            alt='edit kid avatar'
            className={styles['kid-edit-avatar']}
          />
        </Col>
        <Col xs={5}>
          <Form.Label>Kid&apos;s Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Full Name'
            className='p-3'
            name='fullName'
            value={formik.values.fullName}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.fullName}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.errors.fullName}
          </Form.Control.Feedback>
        </Col>
        <Col xs={4}>
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
        <Col xs={9}>
          <h4>More Information</h4>
          <p>Add items in the fields below to keep each other in the loop.</p>
          <Form.Group>
            <Form.Label>Allergies</Form.Label>
            <Form.Select
              className='p-3 text-muted'
              name='allergies'
              value={formik.values.allergies}
              onChange={formik.handleChange}
              defaultValue={ALLERGIES_VALUE[0]}
              isInvalid={!!formik.errors.allergies}>
              {ALLERGIES_VALUE.map((allergy, index) => (
                <option key={index} value={allergy}>
                  {allergy}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.allergies}
            </Form.Control.Feedback>
            <Form.Label>Interest</Form.Label>
            <Form.Select
              className='p-3 text-muted'
              name='interests'
              value={formik.values.interests}
              onChange={formik.handleChange}
              defaultValue={INTEREST_VALUE[0]}
              isInvalid={!!formik.errors.interests}>
              {INTEREST_VALUE.map((interest, index) => (
                <option key={index} value={interest}>
                  {interest}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.interests}
            </Form.Control.Feedback>
            <Form.Label>Fears</Form.Label>
            <Form.Select
              className='p-3 text-muted'
              name='fears'
              value={formik.values.fears}
              onChange={formik.handleChange}
              defaultValue={FEARS_VALUE[0]}>
              {FEARS_VALUE.map((fear, index) => (
                <option key={index} value={fear}>
                  {fear}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.fears}
            </Form.Control.Feedback>

            <Form.Label>Other</Form.Label>

            <Form.Control
              as='textarea'
              rows={3}
              className='p-3'
              value={countSymbol}
              onChange={handleCountSymbol}
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
