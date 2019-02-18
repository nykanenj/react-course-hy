
const cors = require('cors');
const mongoose = require('mongoose');

const express = require('express');
const config = require('./utils/config');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();
const blogsRouter = require('./controllers/blogs');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogsRouter);

const url = config.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });
app.use(middleware.unknownEndpoint);
// app.use(middleware.errorHandler);

module.exports = app;
