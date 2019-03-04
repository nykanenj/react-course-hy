import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification, resetNotification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  //render sthing only when notification
  if (notification) {
    setTimeout(() => {
      resetNotification()
    }, 5000);

    return (
      <div style={style}>
        {notification}
      </div>
    );
  }

  return <div></div>;
}

const mapStateToProps = state => {
  return { 
    notification: state.notification,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetNotification: () => dispatch({
      type: 'RESET_NOTIFICATION'
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
