import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FilterForm from './components/FilterForm';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes();
  }, []);

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

export default connect(
    null, 
    { initializeAnecdotes }
  )(App);

