import React from 'react';

const Notification = ({ message, classNameProp = 'error', setNotification }) => {
  if (!message) return null;
  setTimeout(() => {
    setNotification('');
  }, 10000);

  return (
    <div className={classNameProp}>
      {message}
    </div>
  );
};

export default Notification;