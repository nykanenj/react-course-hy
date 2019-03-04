import React from 'react';

const FilterForm = ({ store }) => {

  const filterChange = (event) => {
    store.dispatch({
      type: 'FILTER_CHANGE',
      data: {
        filter: event.target.value
      }
    });
  };

  return (
    <div>
      Filter
      <input onChange={filterChange} />
    </div>
  )

}

export default FilterForm;

