const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const voteAction = (id, notification) => {
  return {
    type: 'VOTE',
    data: {
      id,
      notification,
    },
  }
}

const createAnecdoteAction = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}


const initialState = anecdotesAtStart.map(asObject);


const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'VOTE':
      const anecdotes = state.map(a => {
        if (a.id !== action.data.id) return a;
        const newAnecdote = {
          content: a.content,
          id: a.id,
          votes: a.votes + 1,
        };
        return newAnecdote;
      });
      return anecdotes;
    case 'NEW_ANECDOTE':
      const newAnecdote = {
        content: action.data.content,
        id: getId(),
        votes: 0
      }
      return state.concat(newAnecdote);
    default: return state;
  }
}

export default anecdoteReducer;

export { 
  voteAction,
  createAnecdoteAction,
};
