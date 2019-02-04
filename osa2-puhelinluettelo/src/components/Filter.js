import React from 'react';

const Filter = ({expression, setExpression}) => {

    const onExpressionChange = (event) => {
      setExpression(event.target.value);
    }
    
    return (
      <div>
        <h3>Suodata hakutuloksia</h3>
        <div>
          Suodata: 
          <input
              value={expression}
              onChange={onExpressionChange}
          />
        </div>
      </div>
    );
  }

  export default Filter;