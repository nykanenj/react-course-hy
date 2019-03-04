const filterReducer = (state = '', action) => {
  switch(action.type){
    case 'FILTER_CHANGE':
      return action.data.filter;
    default: return state;
  }
}

export default filterReducer;
