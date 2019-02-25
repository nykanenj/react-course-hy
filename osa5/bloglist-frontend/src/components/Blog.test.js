import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Blog from './Blog';

test('Renders content, collapsed', () => {
  const blog = {
    title: 'Harry Potter New Spells Blog',
    author: 'JK Rowling',
    url: 'rowling.com/blog',
    likes: 5,
  };

  const mockHandler1 = jest.fn();
  const mockHandler2 = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      handleLike={mockHandler1}
      handleRemove={mockHandler2}
    />,
  );

  expect(component.container).toHaveTextContent(
    'Harry Potter New Spells Blog',
  );
  expect(component.container).toHaveTextContent(
    'JK Rowling',
  );
  expect(component.container).not.toHaveTextContent(
    'blog has 5 likes',
  );
  expect(component.container).not.toHaveTextContent(
    'rowling.com/blog',
  );
});

test('Renders content, expanded', () => {
  const blog = {
    title: 'Harry Potter New Spells Blog',
    author: 'JK Rowling',
    url: 'rowling.com/blog',
    likes: 5,
    user: {
      name: 'John Smith',
      id: 14,
    },
  };

  const loggedUser = {
    name: 'John Smith',
    username: 'smithjoh',
    token: '123432353',
  };

  const mockHandler1 = jest.fn();
  const mockHandler2 = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      handleLike={mockHandler1}
      handleRemove={mockHandler2}
    />,
  );

  const button = component.container.querySelector('.expandable');
  fireEvent.click(button);

  expect(component.container).toHaveTextContent(
    'Harry Potter New Spells Blog',
  );
  expect(component.container).toHaveTextContent(
    'JK Rowling',
  );
  expect(component.container).toHaveTextContent(
    'Likes: 5',
  );
  expect(component.container).toHaveTextContent(
    'rowling.com/blog',
  );
  expect(component.container).toHaveTextContent(
    'John Smith',
  );
});
