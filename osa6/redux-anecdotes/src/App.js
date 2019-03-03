import React from 'react';

const App = ({ store }) => {
  const anecdotes = store.getState().sort((a, b) => b.votes - a.votes);
  
  const vote = (id) => {
    const action = {
      type: 'VOTE',
      data: {
        id,
      }
    }
    store.dispatch(action);
  }

  const createAnectdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content,
      },
    });
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnectdote} >
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App

