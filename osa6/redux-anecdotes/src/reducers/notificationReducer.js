
export const notiAction = (notification) => {
  const action = {
    type: 'SET_NOTIFICATION',
    data: { 
      notification: notification
    }
  }
  return action;
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'VOTE':
      return `Voted for: ${action.data.notification}`;
    case 'NEW_ANECDOTE':
      return `Created new anecdote: ${action.data.notification}`;
    case 'RESET_NOTIFICATION':
      return '';
    default: return state;
  }
}

export default notificationReducer;
