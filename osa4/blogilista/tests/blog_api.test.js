const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'Kesäkurpitsa pizza reseptit',
    author: 'Heli',
    url: 'www.kurpizzab.blog',
    likes: 5,
  },
  {
    title: 'Jonnen Jälkiruoat',
    author: 'Jonne Jononen',
    url: 'www.jolkiroat.fi/blog',
    likes: 10,
  },
  {
    title: 'Jonnen Aaron Music Blog',
    author: 'Jonne Aaron',
    url: 'www.aaronmusic.fi/blog',
    likes: 16,
  },
  {
    title: 'James Bond adventures',
    author: 'James Bond',
    url: 'www.jamesbond.com/blog',
    likes: 16,
  },
  {
    title: 'Kimi Räikkönen F1 notes',
    author: 'Kimi',
    url: 'www.kimiraikkonen.com/blog',
    likes: 7,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const item of initialBlogs) {
    const entry = new Blog(item);
    await entry.save();
  }
});

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs');
  expect(response.statusCode).toBe(200);
  expect(response.header['content-type']).toBe('application/json; charset=utf-8');
});

test('Six blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(initialBlogs.length);
});

test('James Bond blog found in blogs', async () => {
  const response = await api.get('/api/blogs');
  const titles = response.body.map(item => item.title);

  expect(titles).toContain('Kimi Räikkönen F1 notes');
});

test('All blogs have id param', async () => {
  const response = await api.get('/api/blogs');
  response.body.map(item => expect(item.id).toBeDefined());
});

test('Blog title missing', async () => {
  const blogEntry = new Blog({
    author: 'John Smith',
    url: 'www.batman.com/blog',
    likes: 100,
  });

  const response = await api.post('/api/blogs').send(blogEntry);
  expect(response.statusCode).toBe(400);

  const blogs = await api.get('/api/blogs');
  expect(blogs.body.length).toBe(initialBlogs.length);
});

test('Blog url missing', async () => {
  const blogEntry = new Blog({
    title: 'Batman Blog',
    author: 'John Smith',
    likes: 100,
  });

  const response = await api.post('/api/blogs').send(blogEntry);
  expect(response.statusCode).toBe(400);

  const blogs = await api.get('/api/blogs');
  expect(blogs.body.length).toBe(initialBlogs.length);
});

test('Post test, entry found, no. of blogs increased', async () => {
  const blogEntry = new Blog({
    title: 'Batman blog',
    author: 'John Smith',
    url: 'www.batman.com/blog',
    likes: 100,
  });

  const response = await api.post('/api/blogs').send(blogEntry);
  expect(response.statusCode).toBe(201);

  const blogs = await api.get('/api/blogs');
  const titles = blogs.body.map(item => item.title);

  expect(titles).toContain('Batman blog');
  expect(titles.length).toBe(initialBlogs.length + 1);
});

test('Likes undefined results in 0', async () => {
  const blogEntry = new Blog({
    title: 'Not liked blog',
    author: 'John No Like',
    url: 'www.nolikes.com/blog',
  });

  const response = await api.post('/api/blogs').send(blogEntry);
  expect(response.statusCode).toBe(201);

  const blogs = await api.get('/api/blogs');
  const addedBlog = blogs.body[initialBlogs.length];

  expect(addedBlog.likes).toBe(0);
});

afterAll(() => {
  mongoose.connection.close();
});
