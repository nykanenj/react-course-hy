import React from 'react';
import FilterForm from './components/FilterForm';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';

const App = () => {
  return (
    <div>
      <h1> Anecdote Voting Website </h1>
      <Notification />
      <FilterForm />
      <AnecdoteForm 
        title='Create New' 
        inputName='anecdote' 
      />
      <AnecdoteList />

    </div>
  )
};

export default App;

