import React from 'react';


const AnecdoteForm = ({ inputName, title, createAnecdote}) => {


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
