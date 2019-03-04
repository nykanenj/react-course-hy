import React from 'react';
import FilterForm from './components/FilterForm';
import AnecdoteForm from './components/AnecdoteForm';
import ConnectedAnecdoteList from './components/AnecdoteList';
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
      <ConnectedAnecdoteList />

    </div>
  )
};

export default App;

