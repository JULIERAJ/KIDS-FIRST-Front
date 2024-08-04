import { useState } from 'react';
import { Col, Form, Row, Image } from 'react-bootstrap';

import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import edit from '@media/icons/icon.png';

import { ALLERGIES_VALUE } from './constants/allergies';
import { FEARS_VALUE } from './constants/fears';
import { INTEREST_VALUE } from './constants/interests';
import kid from './kid.png';
import styles from './KidForm.module.css';

const KidForm = () => {
  const [countSymbol, setCountSymbol] = useState('');

  const handleCountSymbol = (event) => {
    setCountSymbol(event.target.value);
  };
  return (
    <Form>
      <Row>
        <Col md='3' className={styles['kid-avatar-container']}>
          <Image src={kid} width={158} height={158} roundedCircle />
          <Image
            src={edit}
            alt='edit kid avatar'
            className={styles['kid-edit-avatar']}
          />
        </Col>
        <Col md='5'>
          <Form.Label>Kid&apos;s Name</Form.Label>
          <Form.Control type='text' placeholder='Full Name' className='p-3' />
        </Col>
        <Col as={Col} md='4'>
          <Form.Label>Birth Date</Form.Label>
          <Form.Control type='text' placeholder='MM/DD/YY' className='p-3' />
        </Col>
      </Row>
      <h4>More Information</h4>
      <p>Add items in the fields below to keep each other in the loop.</p>
      <Form.Group>
        <Form.Label>Allergies</Form.Label>
        <Form.Select
          className='p-3 text-muted'
          defaultValue={ALLERGIES_VALUE[0]}>
          {ALLERGIES_VALUE.map((allergy, index) => (
            <option key={index} value={allergy}>
              {allergy}
            </option>
          ))}
        </Form.Select>
        <Form.Label>Interest</Form.Label>
        <Form.Select
          className='p-3 text-muted'
          defaultValue={INTEREST_VALUE[0]}>
          {INTEREST_VALUE.map((interest, index) => (
            <option key={index} value={interest}>
              {interest}
            </option>
          ))}
        </Form.Select>
        <Form.Label>Fears</Form.Label>
        <Form.Select className='p-3 text-muted' defaultValue={FEARS_VALUE[0]}>
          {FEARS_VALUE.map((fear, index) => (
            <option key={index} value={fear}>
              {fear}
            </option>
          ))}
        </Form.Select>

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
          <Form.Text className='text-muted'>{countSymbol.length}/200</Form.Text>
        </div>
      </Form.Group>
      <div className='d-flex justify-content-end mt-5'>
        <CustomButton
          className={`primary-light ${styles['custom-button']}`}
          size='med'
          variant='light'>
          Cancel
        </CustomButton>
        <CustomButton
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
