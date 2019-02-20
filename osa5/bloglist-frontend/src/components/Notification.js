import React from 'react';
import PropTypes from 'prop-types';


const Notification = ({ message, classNameProp = 'error' }) => {
  if (message === null) return null;

  return (
    <div className={classNameProp}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  classNameProp: PropTypes.string,
};

export default Notification;
