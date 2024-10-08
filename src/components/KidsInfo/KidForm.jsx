import { useFormik } from 'formik';

import { useState } from 'react';
import { Col, Form, Row, Image, Container } from 'react-bootstrap';

import { createKid } from '@api';
import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import edit from '@media/icons/edit.svg';

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
      // eslint-disable-next-line no-console
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
      otherNotes: '',
    },
    validationSchema: kidValidateSchema,
    onSubmit: (values, { resetForm }) => {
      // eslint-disable-next-line no-console
      console.log('Collected form values:', values);

      formAction(values);

      resetForm();
    },
  });

  const handleCountSymbol = (event) => {
    setCountSymbol(event.target.value);
  };
  return (
    <Container fluid className={styles['main-kid-container']}>
      <Form onSubmit={formik.handleSubmit}>
        <Row className={styles['kid-details-row']}>
          <Col xs={3} className={styles['avatar-container']}>
            <Image src={kid} width={158} height={158} roundedCircle />
            <Image
              src={edit}
              alt='edit kid avatar'
              className={styles['edit-avatar-overlay']}
            />
          </Col>
          <Col xs={4}>
            <Form.Label>Kid&apos;s Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Full Name'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.name}
              style={{ height: '3.5em' }}
            />
            <Form.Control.Feedback
              type='invalid'
              style={{ display: 'block', minHeight: '1.5em' }}>
              {formik.errors.name}
            </Form.Control.Feedback>
          </Col>
          <Col xs={3}>
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              type='text'
              placeholder='MM/DD/YY'
              name='dateOfBirthday'
              value={formik.values.dateOfBirthday}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.dateOfBirthday}
              style={{ height: '3.5em' }}
            />
            <Form.Control.Feedback
              type='invalid'
              style={{ display: 'block', minHeight: '1.5em' }}>
              {formik.errors.dateOfBirthday}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={7}>
            <h4 className='mb-2'>More Information</h4>
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
                  style={{ display: 'block', minHeight: '1.5em' }}>
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
            onClick={() => formik.resetForm()}>
            Cancel
          </CustomButton>
          <CustomButton type='submit' styles='primary-light mx-2' size='xsml'>
            Save
          </CustomButton>
        </div>
      </Form>
    </Container>
  );
};

export default KidForm;
