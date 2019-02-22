import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = (props) => {
  const {
    title,
    author,
    url,
    user,
    likes,
  } = props;
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
            <button type="button">Like </button>
            <br />
            {user && user.name}
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  likes: PropTypes.number,
};

export default Blog;
