import React from 'react';

const AnecdoteList = ({ store }) => {
  const regExpr = new RegExp(store.getState().filter, 'i');
  const anecdotes = store.getState().anecdotes
    .filter(e => regExpr.test(e.content))
    .sort((a, b) => b.votes - a.votes);
    
  const vote = (id, notification) => {
    store.dispatch({
      type: 'VOTE',
      data: {
        id,
        notification
      }
    });
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
};

export default AnecdoteList;