import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import Togglable from './components/Togglable';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      username: event.target.Username.value,
      password: event.target.Password.value
    };
    try {
      const userResponse = await loginService.login(credentials);
      setUser(userResponse);
      window.localStorage.setItem('loggedUser', JSON.stringify(userResponse));
      setSuccessMessage('Login successful');
    } catch (err) {
      setErrorMessage('Käyttäjätunnus tai salasana virheellinen');
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 4000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const createEntry = async (event) => {
    event.preventDefault();
    const blog = {
      title: event.target.Title.value,
      author: event.target.Author.value,
      url: event.target.URL.value,
    };
    try {
      const response = await blogService.postBlog(blog, user.token);
      setBlogs(blogs.concat(response));
      setSuccessMessage('Blogi lisätty onnistuneesti');
    } catch (err) {
      setErrorMessage('Blogin tallentamisessa tapahtui virhe');
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 4000);
    }
  };

  const putEntry = async (blog) => {
    try {
      const blogToSend = {
        ...blog,
        likes: blog.likes + 1,
        user: user.token,
      };
      const id = blog.id;
      delete blogToSend.id;
      await blogService.putBlog(blogToSend, user.token, id);

      const newBlogs = blogs.map(blog => {
        if (blog.id !== id) return blog;
        const newBlog = {
          ...blog,
          likes: blog.likes + 1,
        };
        return newBlog;
      });

      setBlogs(newBlogs);
      setSuccessMessage('Like lisätty');
    } catch (err) {
      setErrorMessage('Liketyksessä tapahtui virhe');
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 4000);
    }
  };

  const removeEntry = async ({ id, title }) => {
    try {
      window.confirm(`Poistetaanko varmasti blogi: ${title}`);
      await blogService.removeBlog(user.token, id);
      const newBlogs = blogs.filter(blog => blog.id !== id);
      setBlogs(newBlogs);
      setSuccessMessage('Blog removed');
    } catch (err) {
      setErrorMessage('Poisto epäonnistui');
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 4000);
    }
  };

  const blogView = (user) => (
    <div>
      <div>
        { `${user.name} logged in` }
      </div>
      <div>
        <button type="button" onClick={() => handleLogout()}>Logout</button>
      </div>
      <h2>Blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
        <Blog
          key={blog.id}
          handleLike={putEntry}
          handleRemove={removeEntry}
          blog={blog}
          loggedUser={user}
        />
      ))}
      <br />
      <Togglable buttonLabel="Add entry">
        <AddBlogForm handleSubmit={createEntry} />
      </Togglable>
    </div>
  );

  return (
    <div>
      <h1>Epic blog page</h1>
      {successMessage && <Notification message={successMessage} classNameProp="success" />}
      {errorMessage && <Notification message={errorMessage} classNameProp="error" />}
      {!user && (
        <LoginForm
          handleSubmit={handleLogin}
        />
      )}
      {user && blogView(user)}
    </div>
  );
};

export default App;
