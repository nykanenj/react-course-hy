import React from 'react';
import { connect } from 'react-redux';
import { voteAction } from '../reducers/anecdoteReducer';

const AnecdoteList = ({ filter, anecdotes, voteAction }) => {
  const regExpr = new RegExp(filter, 'i');
  const parsedAnecdotes = anecdotes
    .filter(e => regExpr.test(e.content))
    .sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {parsedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAction(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
};

const mapStateToProps = state => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes,
  }
};

const mapDispatchToProps = {
  voteAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList);
