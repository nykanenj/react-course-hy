const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (err) {
    next(err);
  }
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const {
      password,
      username,
      name,
    } = request.body;

    if (!password) {
      throw {
        name: 'ValidationError',
        message: 'Password required',
      };
    }

    if (password.length <= 3) {
      throw {
        name: 'ValidationError',
        message: 'Password length must be greater than three',
      };
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await newUser.save();

    response.status(201).json(savedUser.toJSON());
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
