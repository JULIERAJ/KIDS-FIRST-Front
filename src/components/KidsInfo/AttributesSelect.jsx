import { Form } from 'react-bootstrap';
import Select, { components } from 'react-select';

// eslint-disable-next-line react/prop-types
const CheckboxOptions = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <input
        type='checkbox'
        // eslint-disable-next-line react/prop-types
        checked={props.isSelected}
        onChange={() => null}
        style={{ marginRight: 8 }}
      />
      {children}
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
      <Form.Label>{label}</Form.Label>
      <Select
        placeholder='Select items'
        isMulti
        options={options}
        // eslint-disable-next-line react/prop-types
        value={options.filter((option) => value.includes(option.value))}
        onChange={handleChange}
        components={{ Option: CheckboxOptions }}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
      />
      {error && (
        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
      )}
    </>
  );
};

export default AttributesSelect;
