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

afterAll(() => {
  mongoose.connection.close();
});
