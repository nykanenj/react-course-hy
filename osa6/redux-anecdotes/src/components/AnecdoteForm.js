import React from 'react';
import { connect } from 'react-redux';
import { createAnecdoteAction } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = ({ inputName, title, createAnecdoteAction}) => {
  const createAnecdote = async (event) => {
    event.preventDefault();
    const anecdoteText = event.target[inputName].value;
    let newAnecdote = {
      content: anecdoteText,
      votes: 0
    };
    const response = await anecdoteService.createNew(newAnecdote);
    createAnecdoteAction(response);
    console.log('event target', event.target);
    //event.target[inputName].value = '';
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
