
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/info', (request, response) => {
  response.send('Welcome to blogilista API');
});

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  });

  const result = await blog.save();
  response.status(201).json(result.toJSON());
});

module.exports = blogsRouter;
