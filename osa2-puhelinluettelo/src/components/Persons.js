import React from 'react';
import Person from './Person';

const Persons = ({records, expression, removeHandler}) => {
    const regExp = new RegExp(expression, 'i');

    return (
      <div>
        <h3>Numerot</h3>
        {records.filter(record => regExp.test(record.name)).map(person => 
          <Person key={person.id} name={person.name} number={person.number} id={person.id} removeHandler={removeHandler}/>)}
      </div>
    );
  }

  export default Persons;