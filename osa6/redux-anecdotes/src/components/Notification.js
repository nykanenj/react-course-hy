import React from 'react';

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  //render sthing only when notification
  if (store.getState().notification) {
    setTimeout(() => {
      store.dispatch({
        type: 'RESET_NOTIFICATION'
      });
    }, 5000);

    return (
      <div style={style}>
        {store.getState().notification}
      </div>
    );
  }

  return <div></div>;
}

export default Notification
