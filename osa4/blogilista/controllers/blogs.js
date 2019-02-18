
const blogsRouter = require('express').Router();
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
  const newBlog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: request.body.user,
  });

  try {
    const result = await newBlog.save();
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
