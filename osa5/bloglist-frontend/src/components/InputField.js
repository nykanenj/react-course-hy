import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ header, value, setFunction }) => (
  <div>
    {header}
    <input
      type="text"
      value={value}
      name="Password"
      onChange={({ target }) => setFunction(target.value)}
    />
  </div>
);


InputField.propTypes = {
  header: PropTypes.string.isRequired,
  value: PropTypes.node,
  setFunction: PropTypes.func.isRequired,
};

export default InputField;
