import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ header, type, value, onChange }) => (
  <div>
    {header}
    <input
      type={type}
      value={value}
      name={header}
      onChange={onChange}
    />
  </div>
);


InputField.propTypes = {
  header: PropTypes.string.isRequired,
  value: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  reset: PropTypes.func,
};

export default InputField;
