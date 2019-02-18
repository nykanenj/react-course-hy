const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const likesArr = blogs.map(e => (e.likes ? e.likes : 0));
  const reducer = (total, value) => total + value;
  return likesArr.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return {};
  blogs.sort((a, b) => a.likes < b.likes);
  return blogs[0];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const reducer = (res, blog) => {
    if (!res[blog.author]) {
      res[blog.author] = {
        author: blog.author,
        blogs: 1,
      };
    } else {
      res[blog.author].blogs += 1;
    }
    return res;
  };

  const resultArray = blogs.reduce(reducer, {});
  const keysLargestSmallest = Object.keys(resultArray).sort((a, b) => {
    return resultArray[b].blogs - resultArray[a].blogs;
  });
  return resultArray[keysLargestSmallest[0]];
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  const reducer = (res, blog) => {
    if (!res[blog.author]) {
      res[blog.author] = {
        author: blog.author,
        likes: blog.likes,
      };
    } else {
      res[blog.author].likes += blog.likes;
    }
    return res;
  };
  const resultArray = blogs.reduce(reducer, {});
  const keysLargestSmallest = Object.keys(resultArray).sort((a, b) => resultArray[b].likes - resultArray[a].likes);
  const keyWithMostLikes = keysLargestSmallest[0];
  return resultArray[keyWithMostLikes];
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
