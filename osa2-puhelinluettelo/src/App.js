import React, { useState, useEffect } from 'react';

import apiservice from './services/apiservice';
import Filter from './components/Filter';
import Persons from './components/Persons';
import AddPersonForm from './components/AddPersonForm';
import Notification from './components/Notification';

const App = () => {
  const [ records, setRecords] = useState([]);
  const [ expression, setExpression ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ message, setMessage] = useState({ text: null, class: 'success'});

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
          setMessage({text:`Henkilön ${newName} tietoja päivitetty`, class: 'success'});
          setTimeout(() => setMessage({ text:null }), 5000);
          setNewName('');
          setNewNumber('');
        })
        .catch(() => {
          setMessage({text:`${newName} on jo poistettu`, class:'error'});
          setTimeout(() => setMessage({ text:null }), 5000);
        })
        return;
    }

    apiservice.create(newPerson)
      .then(response => {
        setRecords(records.concat(response));
      })
      .then(() => {
        setMessage({text:`${newName} lisätty kantaan!`, class:'success'});
        setTimeout(() => setMessage({ text:null }), 5000);
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.log('error', error.response.data);
        setMessage({text: error.response.data.error, class:'error'});
        setTimeout(() => setMessage({ text:null }), 5000);
      });
  }

  const removeHandler = (name, id) => {
    window.confirm(`Haluatko varmasti poistaa henkilön ${name}?`) &&
    apiservice.remove(id)
    .then(id => {
      const existing = records.filter(record => record.id !== id);
      setRecords(existing);
    })
    .then(() => {   
      setMessage({text:`${name} poistettu kannasta!`, class:'success'});
      setTimeout(() => setMessage({ text:null }), 5000);
    });
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={message.text} classNameProp={message.class} />
      <Filter expression={expression} setExpression={setExpression}/>
      <AddPersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <Persons expression={expression} records={records} removeHandler={removeHandler} />
    </div>
  );

}

export default App