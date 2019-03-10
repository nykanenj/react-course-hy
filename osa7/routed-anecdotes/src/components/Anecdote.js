import React from 'react';

const Anecdote = ({ anecdote }) => {

  return (
    <div>
      <h2>
        {`${anecdote.content} by ${anecdote.author}`}
      </h2>
      <div>
        {`Votes: ${anecdote.votes}`}
      </div>
      <div>
        {`For more info:`}
        <a href={anecdote.info}>{anecdote.info}</a>
      </div>
      <br />
    </div>
  );

}

export default Anecdote;
