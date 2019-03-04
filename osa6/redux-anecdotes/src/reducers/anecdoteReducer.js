import anecdoteService from '../services/anecdotes';

const voteAction = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    };
    const data = await anecdoteService.saveVote(newAnecdote);
    dispatch({ 
      type: 'VOTE',
      data,
    });
  }
}

const createAnecdoteAction = (anecdote) => {
  return async dispatch => {
    const data = await anecdoteService.createNew(anecdote);
    dispatch({
    type: 'NEW_ANECDOTE',
    data,
    });
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

export const initializeAnecdotes = () => {
  return async dispatch => { 
    const anecdotes = await anecdoteService.getAll()
    dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes,
    });
  }
}

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
