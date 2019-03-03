import React from 'react';

const AnecdoteForm = ({ inputName, title, store}) => {
  const createAnecdote = (event) => {
    event.preventDefault();
    store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: event.target.anecdote.value,
        notification: event.target.anecdote.value
      },
    });
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
