import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import SimpleBlog from './SimpleBlog';

test('Renders content', () => {
  const blog = {
    title: 'Harry Potter New Spells Blog',
    author: 'JK Rowling',
    likes: 5,
  };

  const component = render(
    <SimpleBlog blog={blog} />,
  );

  expect(component.container).toHaveTextContent(
    'Harry Potter New Spells Blog',
  );
  expect(component.container).toHaveTextContent(
    'JK Rowling',
  );
  expect(component.container).toHaveTextContent(
    'blog has 5 likes',
  );
});

test('Like pressed twice', async () => {
  const blog = {
    title: 'Harry Potter New Spells Blog',
    author: 'JK Rowling',
    likes: 5,
  };

  const mockHandler = jest.fn();
  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />,
  );

  const button = getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
