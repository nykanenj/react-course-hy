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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
