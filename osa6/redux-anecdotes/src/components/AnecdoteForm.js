import React from 'react';
import { connect } from 'react-redux';
import { createAnecdoteAction } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ inputName, title, createAnecdoteAction}) => {
  const createAnecdote = async (event) => {
    event.preventDefault();
    const anecdoteText = event.target[inputName].value;
    const newAnecdote = {
      content: anecdoteText,
      votes: 0
    };
    createAnecdoteAction(newAnecdote);
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

const mapDispatchToProps = {
  createAnecdoteAction,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);
