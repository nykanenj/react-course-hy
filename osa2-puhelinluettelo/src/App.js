import React, { useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import AddPersonForm from './components/AddPersonForm';

const App = () => {
  const [ records, setRecords] = useState([
    { 
        name: 'Arto Hellas',
        number: '0101231234',
        id: 1
    },
    { 
        name: 'Juuso Nykänen',
        number: '0201231234',
        id: 2
    },
    { 
        name: 'arska',
        number: '0301231234',
        id: 3
    },
  ]) 
  const [ expression, setExpression ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const found = records.findIndex(e => e.name === newName); 
    if (found !== -1) {
        alert(`${newName} already exists.`);
        return;
    } 
    const newPerson = {
        name: newName,
        number: newNumber,
        id: records.length + 1
    }
    setRecords(records.concat(newPerson));
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter expression={expression} setExpression={setExpression}/>
      <AddPersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <Persons expression={expression} records={records} />
    </div>
  );

}

export default App