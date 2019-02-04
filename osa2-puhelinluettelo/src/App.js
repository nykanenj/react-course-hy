import React, { useState, useEffect } from 'react';

import apiservice from './services/apiservice';
import Filter from './components/Filter';
import Persons from './components/Persons';
import AddPersonForm from './components/AddPersonForm';

const App = () => {
  const [ records, setRecords] = useState([]);
  const [ expression, setExpression ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  useEffect(() => {
    apiservice.getAll()
    .then(response => setRecords(response))
  }, []);


  const addPerson = (event) => {
    event.preventDefault();
    const found = records.findIndex(e => e.name === newName);
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (found !== -1) {
        window.confirm(`${newName} already exists, update existing record?`) &&
        apiservice.update(newPerson, records[found].id)
        .then(response => setRecords(records.map(record => record.id !== response.id ? record : response)))
        .then(() => {
          setNewName('');
          setNewNumber('');
        });
        return;
    }

    apiservice.create(newPerson)
      .then(response => setRecords(records.concat(response)))
      .then(() => {
        setNewName('');
        setNewNumber('');
      });
  }

  const removeHandler = (name, id) => {
    window.confirm('Haluatko varmasti poistaa henkilön ', name) &&
    apiservice.remove(id)
    .then(id => {
      const existing = records.filter(record => record.id !== id);
      setRecords(existing);
    });
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter expression={expression} setExpression={setExpression}/>
      <AddPersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <Persons expression={expression} records={records} removeHandler={removeHandler} />
    </div>
  );

}

export default App