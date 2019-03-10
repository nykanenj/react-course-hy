import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter,
} from 'react-router-dom';
import './App.css';

import AnecdoteList from './components/AnecdoteList';
import About from './components/About';
import Anecdote from './components/Anecdote';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Notification from './components/Notification';

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.setNotification(`A new anecdote ${content} added successfully`);
    setSubmitted(true);
  }

  if (submitted) return <Redirect to="/" />;

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification 
          message={notification}
          classNameProp='success'
          setNotification={setNotification}
        />
        <Route exact path = "/" render={() => <AnecdoteList anecdotes={anecdotes} /> } />
        <Route path = "/create" render={() => <CreateNew addNew={addNew} setNotification={setNotification} /> } />
        <Route path = "/about" render={() => <About /> } />
        <Route exact path = "/anecdote/:id" render={({ match }) =>
          <Anecdote anecdote={anecdoteById(match.params.id)} />}
        />
        <Footer />
      </div>
    </Router>
  )
}

export default App;
