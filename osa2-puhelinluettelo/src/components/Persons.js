import React from 'react';
import Person from './Person';

const Persons = ({records, expression}) => {
    const regExp = new RegExp(expression, 'i');

    return (
      <div>
        <h3>Numerot</h3>
        {records.filter(record => regExp.test(record.name)).map(person => 
          <Person key={person.id} name={person.name} number={person.number} />)}
      </div>
    );
  }

  export default Persons;