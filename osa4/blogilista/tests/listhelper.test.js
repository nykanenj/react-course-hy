const listHelper = require('../utils/list_helper');

describe('dummy tests', () => { 
  test('dummy return 1', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('totalLikes tests', () => {
  test('Empty array returns 0', () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test('One blog returns 5', () => {
    const blogs = [
      {
        title: 'Kesäkurpitsa pizza reseptit',
        author: 'Heli',
        url: 'www.kurpizzab.blog',
        likes: 5,
        id: '5c69a6d19cb54625f7aa4246',
      },
    ];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(5);
  });

  test('One blog, no likes parameter, returns 0', () => {
    const blogs = [
      {
        title: 'Kesäkurpitsa pizza reseptit',
        author: 'Heli',
        url: 'www.kurpizzab.blog',
        id: '5c69a6d19cb54625f7aa4246',
      },
    ];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test('Many blogs returns 41', () => {
    const blogs = [
      {
        title: 'Kesäkurpitsa pizza reseptit',
        author: 'Heli',
        url: 'www.kurpizzab.blog',
        likes: 5,
        id: '5c69a6d19cb54625f7aa4246',
      },
      {
        title: 'Jonnen Jälkiruoat',
        author: 'Jonne Jononen',
        url: 'www.jolkiroat.fi/blog',
        likes: 10,
        id: '5c69a7519cb54625f7aa4247',
      },
      {
        title: 'Jonnen Jälkiruoat',
        author: 'Jonne Jononen',
        url: 'www.jolkiroat.fi/blog',
        likes: 10,
        id: '5c69b49d0497b72c6d94008d',
      },
      {
        title: 'Jonnen Aaron Music Blog',
        author: 'Jonne Aaron',
        url: 'www.aaronmusic.fi/blog',
        likes: 0,
        id: '5c6a596a5be1232f2d612c8f',
      },
      {
        title: 'James Bond adventures',
        author: 'James Bond',
        url: 'www.jamesbond.com/blog',
        likes: 16,
        id: '5c6a5e7bdb729630e50b4a48',
      },
    ];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(41);
  });

  test('Many blogs returns 0', () => {
    const blogs = [
      {
        title: 'Kesäkurpitsa pizza reseptit',
        author: 'Heli',
        url: 'www.kurpizzab.blog',
        likes: 0,
        id: '5c69a6d19cb54625f7aa4246',
      },
      {
        title: 'Jonnen Jälkiruoat',
        author: 'Jonne Jononen',
        url: 'www.jolkiroat.fi/blog',
        likes: 0,
        id: '5c69a7519cb54625f7aa4247',
      },
      {
        title: 'Jonnen Jälkiruoat',
        author: 'Jonne Jononen',
        url: 'www.jolkiroat.fi/blog',
        likes: 0,
        id: '5c69b49d0497b72c6d94008d',
      },
      {
        title: 'Jonnen Aaron Music Blog',
        author: 'Jonne Aaron',
        url: 'www.aaronmusic.fi/blog',
        likes: 0,
        id: '5c6a596a5be1232f2d612c8f',
      },
      {
        title: 'James Bond adventures',
        author: 'James Bond',
        url: 'www.jamesbond.com/blog',
        likes: 0,
        id: '5c6a5e7bdb729630e50b4a48',
      },
    ];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });
});
