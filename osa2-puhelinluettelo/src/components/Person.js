import React from 'react';

const Person = ({name, number, id, removeHandler}) => 
    <div> {name} {number} <button onClick={() => removeHandler(name, id)}> Poista </button> </div> ;

export default Person;