import React from 'react';
import { voteAction, createAction } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = ({ store }) => {

  return (
    <div>
      <AnecdoteList store={store} />
      <AnecdoteForm 
        title='Create New' 
        inputName='anecdote' 
        store={store}
      />
    </div>
  )
}

export default App

