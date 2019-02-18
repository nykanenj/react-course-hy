
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const blogsRouter = require('./controllers/blogs');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogsRouter);


// app.use(middleware.unknownEndpoint);
// app.use(middleware.errorHandler);

module.exports = app;
