import React from 'react';
import { voteAction, createAction } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';

const App = ({ store }) => {
  const anecdotes = store.getState().sort((a, b) => b.votes - a.votes);
  
  const createAnecdote = (event) => {
    event.preventDefault();
    store.dispatch(createAction(event.target.anecdote.value));
    event.target.anecdote.value = '';
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => store.dispatch(voteAction(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm title='Create New' inputName='anecdote' createAnecdote={createAnecdote}/>
    </div>
  )
}

export default App

