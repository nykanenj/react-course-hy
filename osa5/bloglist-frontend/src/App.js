import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    blogService.getAll().then(fetchedBlogs => setBlogs(fetchedBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      setToken(loggedUser.setToken);
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
    } catch (err) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const loginView = (
    <div>
      <h2>Kirjaudu</h2>
      <form onSubmit={handleLogin}>
        <div>
          Käyttäjätunnus
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Salasana
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
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

      <h2>Blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  );

  return (
    <div>
      <h1>Epic blog page</h1>

      {errorMessage && <Notification message={errorMessage} />}

      {!user && loginView}
      {user && blogView(user)}
    </div>
  );
};

export default App;
