import React from 'react';
import { connect } from 'react-redux';
import { createAnecdoteAction } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ inputName, title, createAnecdoteAction}) => {
  const createAnecdote = (event) => {
    event.preventDefault();
    createAnecdoteAction(event.target[inputName].value)
    event.target[inputName].value = '';
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
