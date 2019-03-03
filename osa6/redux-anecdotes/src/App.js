import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';

const App = ({ store }) => {
  return (
    <div>
      <Notification store={store} />
      <AnecdoteList store={store} />
      <AnecdoteForm 
        title='Create New' 
        inputName='anecdote' 
        store={store}
      />
    </div>
  )
};

export default App;

