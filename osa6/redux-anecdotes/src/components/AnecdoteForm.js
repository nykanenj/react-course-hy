import React from 'react';
import { createAction } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ inputName, title, store}) => {
  const createAnecdote = (event) => {
    event.preventDefault();
    store.dispatch(createAction(event.target.anecdote.value));
    event.target.anecdote.value = '';
  }

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={createAnecdote} >
        <div><input name={inputName} /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;
