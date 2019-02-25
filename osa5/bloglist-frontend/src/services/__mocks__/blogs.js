const blogs = [
  {
    title: 'Jonnen Jälkiruoat',
    author: 'Jonne Jononen',
    url: 'www.jolkiroat.fi/blog',
    likes: 10,
    id: '5c69b49d0497b72c6d94008d',
  },
  {
    title: 'James Bond adventures',
    author: 'James Bond',
    url: 'www.jamesbond.com/blog',
    likes: 16,
    id: '5c6a5e7bdb729630e50b4a48',
  },
  {
    title: 'Test blog with user',
    author: 'Author 2',
    url: 'www.testurl.com/blog2',
    likes: 7,
    id: '5c6aef3c947b125ba502d571',
  },
  {
    title: 'Test blog with user attempt 3',
    author: 'Author 3',
    url: 'www.testurl.com/blog3',
    likes: 8,
    user: {
      username: 'palanderkall',
      name: 'Kalle Palander',
      id: '5c6ae1100d182f560507188b',
    },
    id: '5c6aefad7c04f35c08ec7c0b',
  },
  {
    title: 'Add blog with token auth 2',
    author: 'Author 5000',
    url: 'www.testurl.com/blog5000',
    likes: 20,
    user: {
      username: 'smithjef',
      name: 'Jeff Smith',
      id: '5c6af12ab56b6a5cd75047eb',
    },
    id: '5c6affe0d2eb97623e46a8bb',
  },
];

const getAll = () => Promise.resolve(blogs);

export default { getAll };
