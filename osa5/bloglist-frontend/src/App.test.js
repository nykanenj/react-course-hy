import React from 'react';
import {
  render, waitForElement, act,
} from 'react-testing-library';
import App from './App';

jest.mock('./services/blogs');

describe('<App /> testit', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />,
    );
    component.rerender(<App />);

    await waitForElement(
      () => component.getByText('Kirjaudu'),
    );

    const blogs = component.container.querySelectorAll('blog');
    expect(blogs.length).toBe(0);
    expect(component.container).toHaveTextContent('Käyttäjätunnus');
    expect(component.container).toHaveTextContent('Password');
    expect(component.container).not.toHaveTextContent('Jonnen Jälkiruoat');
  });

  test('if user logged, blogs are rendered', async () => {
    const user = {
      username: 'smithjef',
      token: '12341234',
      name: 'Jeff Smith',
    };
    localStorage.setItem('loggedUser', JSON.stringify(user));

    const component = render(
      <App />,
    );
    component.rerender(<App />);

    await waitForElement(
      () => component.getByText('Blogs'),
    );

    const blogs = component.container.querySelectorAll('.blog-styles');
    expect(blogs.length).toBe(5);
    expect(component.container).not.toHaveTextContent('Käyttäjätunnus');
    expect(component.container).not.toHaveTextContent('Password');
    expect(component.container).toHaveTextContent('Jonnen Jälkiruoat');
  });
});
