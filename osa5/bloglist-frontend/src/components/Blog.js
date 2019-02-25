import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleLike, handleRemove }) => {
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
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default Blog;
