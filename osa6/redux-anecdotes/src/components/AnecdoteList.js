import React from 'react';
import { connect } from 'react-redux';
import { voteAction } from '../reducers/anecdoteReducer';

const AnecdoteList = ({ parsedAnecdotes, voteAction }) => {

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

const parseAnecdotes = ({ anecdotes, filter }) => {
  const regExpr = new RegExp(filter, 'i');
  const parsedAnecdotes = anecdotes
    .filter(e => regExpr.test(e.content))
    .sort((a, b) => b.votes - a.votes);
  return parsedAnecdotes
}

const mapStateToProps = state => {
  return {
    parsedAnecdotes: parseAnecdotes(state),
  }
};

const mapDispatchToProps = {
  voteAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList);
