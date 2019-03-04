import React from 'react';
import { connect } from 'react-redux';

const FilterForm = ({ filterChange }) => {
  return (
    <div>
      Filter
      <input onChange={filterChange} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    filterChange: event => { 
      dispatch({
        type: 'FILTER_CHANGE',
        data: {
          filter: event.target.value
        }
      })
    },
  }
}

export default connect(null, mapDispatchToProps)(FilterForm);

