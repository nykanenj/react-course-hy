
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/info', (request, response) => {
  response.send('Welcome to blogilista API');
});

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
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
    likes: request.body.likes ? request.body.likes : 0,
  });

  try {
    const result = await newBlog.save();
    response.status(201).json(result.toJSON());
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
