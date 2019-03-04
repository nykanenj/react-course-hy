import React from 'react';
import FilterForm from './components/FilterForm';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';

const App = ({ store }) => {
  return (
    <div>
      <h1> Anecdote Voting Website </h1>
      <Notification store={store} />
      <FilterForm store={store} />
      <AnecdoteForm 
        title='Create New' 
        inputName='anecdote' 
        store={store}
      />
      <AnecdoteList store={store} />

    </div>
  )
};

export default App;

