const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

const initialUsers = [
  {
    username: 'meikamat',
    name: 'Matti Meika',
    passwordHash: 'enkerro',
  },
  {
    username: 'luovalii',
    name: 'Liisa Luova',
    passwordHash: 'enkerro',
  },
  {
    username: 'muskelo',
    name: 'Elon Musk',
    passwordHash: 'mars2020',
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  for (const item of initialUsers) {
    const entry = new User(item);
    await entry.save();
  }
});

test('Users returned as json', async () => {
  const response = await api.get('/api/users');
  expect(response.statusCode).toBe(200);
  expect(response.header['content-type']).toBe('application/json; charset=utf-8');
});

test('Found correct number of users in DB', async () => {
  const response = await api.get('/api/users');

  expect(response.body.length).toBe(initialUsers.length);
});

test('Found user Elon Musk', async () => {
  const response = await api.get('/api/users');
  const usernames = response.body.map(item => item.username);

  expect(usernames).toContain('muskelo');
});

test('400 response for too short pwd', async () => {
  const newUser = {
    username: 'smithjoh',
    name: 'John Smith',
    password: '12',
  };

  const response = await api.post('/api/users').send(newUser);
  expect(response.statusCode).toBe(400);

  const allUsers = await api.get('/api/users');
  expect(allUsers.body.length).toBe(initialUsers.length);
});

test('400 response for no username', async () => {
  const newUser = {
    name: 'John Smith',
    password: '12',
  };

  const response = await api.post('/api/users').send(newUser);
  expect(response.statusCode).toBe(400);

  const allUsers = await api.get('/api/users');
  expect(allUsers.body.length).toBe(initialUsers.length);
});

test('400 response for no password', async () => {
  const newUser = {
    username: 'smithjoh',
    name: 'John Smith',
  };

  const response = await api.post('/api/users').send(newUser);
  expect(response.statusCode).toBe(400);

  const allUsers = await api.get('/api/users');
  expect(allUsers.body.length).toBe(initialUsers.length);
});

test('400 response if username not unique', async () => {
  const newUser = {
    username: 'muskelo',
    name: 'Elon Musk',
    passwordHash: 'mars2020',
  };

  const response = await api.post('/api/users').send(newUser);
  expect(response.statusCode).toBe(400);

  const allUsers = await api.get('/api/users');
  expect(allUsers.body.length).toBe(initialUsers.length);
});

afterAll(() => {
  mongoose.connection.close();
});
