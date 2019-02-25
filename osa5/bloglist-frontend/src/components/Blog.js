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
      <div onClick={toggleVisibility}>
        {`${title}, ${author}`}
        {visible && (
          <div>
            {url}
            <br />
            {likes}
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
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.object,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default Blog;
