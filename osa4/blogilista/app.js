
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');


const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = config.MONGODB_URI;
console.log('Connecting to', mongoUrl);
mongoose.connect(mongoUrl, { useNewUrlParser: true });

app.use('api/blogs', blogsRouter);

app.use(cors());
app.use(bodyParser.json());

app.get('/api/blogs/info',(request, response) => {
  response.send('Welcome to blogilista API');
});

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    });
});

// app.use(middleware.unknownEndpoint);
// app.use(middleware.errorHandler);

module.exports = app;