import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleLike, handleRemove, loggedUser }) => {
  const {
    title,
    author,
    url,
    user,
    likes,
  } = blog;
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showRemoveBtn = !user || user.name === loggedUser.name;

  return (
    <div className="blog-styles">
      <div
        className="expandable"
        role="menuitem"
        onClick={toggleVisibility}
        tabIndex={0}
        onKeyPress={toggleVisibility}
      >
        {`${title}, ${author}`}
        {visible && (
          <div>
            {url}
            <br />
            {`Likes: ${likes}`}
            <br />
            <button
              type="button"
              onClick={() => handleLike(blog)}
            >
                Like
            </button>
            <br />
            {user && `Added by ${user.name}`}
            {showRemoveBtn && (
              <div>
                <br />
                <button
                  type="button"
                  onClick={() => handleRemove(blog)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user: PropTypes.object,
  }).isRequired,
  loggedUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    token: PropTypes.string,
    username: PropTypes.string,
  }),
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default Blog;
