
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/info', (request, response) => {
  response.send('Welcome to blogilista API');
});

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', { username: 1, name: 1 });
    response.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogsRouter.post('/', async (request, response, next) => {

  const {
    title,
    author,
    url,
    likes,
  } = request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or not valid'});
    }

    const user = await User.findById(decodedToken.id);
    const newBlog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user,
    });

    const result = await newBlog.save();
    user.blogs = user.blogs.concat(result._id);
    response.status(201).json(result.toJSON());
  } catch (err) {
    next(err);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const existingEntry = await Blog.findById(request.params.id);
    const existing = existingEntry.toJSON();

    const {
      title,
      author,
      url,
      likes,
    } = request.body;

    const blog = {
      title: title || existing.title,
      author: author || existing.author,
      url: url || existing.url,
      likes: likes || existing.likes,
      user: existing.user,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog,
      { new: true, upsert: true });
    response.json(updatedBlog.toJSON());
  } catch (err) {
    next(err);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
