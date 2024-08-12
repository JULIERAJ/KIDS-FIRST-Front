/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import { Form } from 'react-bootstrap';
import Select, { components } from 'react-select';

import styles from './KidForm.module.css';

// eslint-disable-next-line react/prop-types
const CheckboxOptions = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <div className={styles['checkbox-container']}>
        <div className={styles['checkbox-wrapper']}>
          <input
            type='checkbox'
            // eslint-disable-next-line react/prop-types
            checked={props.isSelected}
            onChange={() => null}
            className={styles.checkbox}
          />
          {props.isSelected && (
            <svg
              className={styles.checkmark}
              width='24'
              height='24'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M9.55 15.15L18.025 6.675C18.225 6.475 18.4625 6.375 18.7375 6.375C19.0125 6.375 19.25 6.475 19.45 6.675C19.65 6.875 19.75 7.1125 19.75 7.3875C19.75 7.6625 19.65 7.9 19.45 8.1L10.25 17.3C10.05 17.5 9.81667 17.6 9.55 17.6C9.28333 17.6 9.05 17.5 8.85 17.3L4.55 13C4.35 12.8 4.25417 12.5625 4.2625 12.2875C4.27083 12.0125 4.375 11.775 4.575 11.575C4.775 11.375 5.0125 11.275 5.2875 11.275C5.5625 11.275 5.8 11.375 6 11.575L9.55 15.15Z'
                fill='rgba(219, 92, 0, 1)'
              />
            </svg>
          )}
        </div>
        <div className={styles['text-wrapper']}>{children}</div>
      </div>
    </components.Option>
  );
};

const AttributesSelect = ({
  // eslint-disable-next-line react/prop-types
  label,
  // eslint-disable-next-line react/prop-types
  error,
  // eslint-disable-next-line react/prop-types
  options,
  // eslint-disable-next-line react/prop-types
  value,
  // eslint-disable-next-line react/prop-types
  setFieldValue,
  // eslint-disable-next-line react/prop-types
  name,
}) => {
  const handleChange = (selected) => {
    setFieldValue(name, selected ? selected.map((option) => option.value) : []);
  };

  return (
    <>
      <Form.Label className={styles['kid-form-label']}>{label}</Form.Label>
      <Select
        className={styles['kid-form-input']}
        placeholder='Select items'
        isMulti
        options={options}
        // eslint-disable-next-line react/prop-types
        value={options.filter((option) => value.includes(option.value))}
        onChange={handleChange}
        components={{ Option: CheckboxOptions }}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        styles={{
          indicatorSeparator: (base) => ({
            ...base,
            display: 'none',
          }),
          valueContainer: (base) => ({
            ...base,
            padding: '6px',
          }),
          control: (base) => ({
            ...base,
            border: '1px solid rgba(252, 252, 252, 1)',
            borderRadius: '8px',
            padding: '8px 8px 8px 12px',
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: 'rgba(164, 223, 225, 1)',
            color: 'white',
            padding: '0.5px',
            borderRadius: '4px',
            marginRight: '12px',
            marginBottom: '12px',
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: '#000',
          }),
          option: (base, state) => {
            return {
              ...base,
              backgroundColor: state.isSelected
                ? 'transparent'
                : base.backgroundColor,
              color: state.isSelected ? 'inherit' : base.color,
            };
          },
        }}
      />
      {error && (
        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
      )}
    </>
  );
};

export default AttributesSelect;
