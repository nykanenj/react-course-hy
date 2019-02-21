import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import InputField from './components/InputField';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(fetchedBlogs => setBlogs(fetchedBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = {
      username,
      password,
    };
    try {
      const userResponse = await loginService.login(credentials);
      setUser(userResponse);
      window.localStorage.setItem('loggedUser', JSON.stringify(userResponse));
      setUsername('');
      setPassword('');
      setSuccessMessage('Login successful');
    } catch (err) {
      setErrorMessage('Käyttäjätunnus tai salasana virheellinen');
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const createEntry = async (event) => {
    event.preventDefault();
    const blog = {
      title,
      author,
      url,
    };
    try {
      const response = await blogService.postBlog(blog, user.token);
      setBlogs(blogs.concat(response));
      setTitle('');
      setAuthor('');
      setUrl('');
      setSuccessMessage('Blogi lisätty onnistuneesti');
    } catch (err) {
      setErrorMessage('Blogin tallentamisessa tapahtui virhe');
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const loginView = (
    <div>
      <h2>Kirjaudu</h2>
      <form onSubmit={handleLogin}>
        <InputField header="Käyttäjätunnus" value={username} setFunction={setUsername} />
        <InputField header="Password" value={password} setFunction={setPassword} />
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  );

  const blogView = (user) => (
    <div>
      <div>
        { `${user.name} logged in` }
      </div>
      <div>
        <button type="button" onClick={() => handleLogout()}>Logout</button>
      </div>
      <h2>Create new</h2>
      <form onSubmit={createEntry}>
        <InputField header="Title" value={title} setFunction={setTitle} />
        <InputField header="Author" value={author} setFunction={setAuthor} />
        <InputField header="URL" value={url} setFunction={setUrl} />
        <button type="submit">Create</button>
      </form>
      <h2>Blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  );

  return (
    <div>
      <h1>Epic blog page</h1>
      {successMessage && <Notification message={successMessage} classNameProp="success" />}
      {errorMessage && <Notification message={errorMessage} classNameProp="error" />}
      <br />
      {!user && loginView}
      {user && blogView(user)}
    </div>
  );
};

export default App;
