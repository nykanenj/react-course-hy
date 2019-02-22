import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = ({ buttonLabel, children }) => {

  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      {!visible && <button type="button" onClick={toggleVisibility}>{buttonLabel}</button>}
      {visible && (
        <div>
          {children}
          <br />
          <button type="button" onClick={toggleVisibility}> cancel </button>
        </div>
      )}
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string,
  children: PropTypes.node,
};

export default Togglable;
