const listHelper = require('../utils/list_helper');

const noblogs = [];

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

describe('dummy tests', () => {
  test('dummy return 1', () => {
    const result = listHelper.dummy(noblogs);
    expect(result).toBe(1);
  });
});

describe('totalLikes tests', () => {
  test('Empty array returns 0', () => {
    const result = listHelper.totalLikes(noblogs);
    expect(result).toBe(0);
  });

  test('One blog returns 5', () => {
    const customblogs = [
      {
        title: 'Kesäkurpitsa pizza reseptit',
        author: 'Heli',
        url: 'www.kurpizzab.blog',
        likes: 5,
        id: '5c69a6d19cb54625f7aa4246',
      },
    ];

    const result = listHelper.totalLikes(customblogs);
    expect(result).toBe(5);
  });

  test('One blog, no likes parameter, returns 0', () => {
    const customblogs = [
      {
        title: 'Kesäkurpitsa pizza reseptit',
        author: 'Heli',
        url: 'www.kurpizzab.blog',
        id: '5c69a6d19cb54625f7aa4246',
      },
    ];

    const result = listHelper.totalLikes(customblogs);
    expect(result).toBe(0);
  });

  test('Many blogs returns 41', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(41);
  });

  test('Many blogs returns 0', () => {
    const noLikesBlogs = [
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

    const result = listHelper.totalLikes(noLikesBlogs);
    expect(result).toBe(0);
  });
});

describe('favouriteBlog tests', () => {
  test('Blog with most likes', () => {
    const expectedResult = {
      title: 'James Bond adventures',
      author: 'James Bond',
      url: 'www.jamesbond.com/blog',
      likes: 16,
      id: '5c6a5e7bdb729630e50b4a48',
    };
    const resultObject = listHelper.favouriteBlog(blogs);

    expect(resultObject).toEqual(expectedResult);
  });

  test('Blogs empty results in empty objects', () => {
    const resultObject = listHelper.favouriteBlog(noblogs);

    expect(resultObject).toEqual({});
  });

  test('Blogs not array results in empty object', () => {
    const resultObject = listHelper.favouriteBlog('NotAnArray');

    expect(resultObject).toEqual({});
  });
});

describe('mostBlogs tests', () => {
  test('Jonne Jononen has most blogs', () => {
    const resultObject = listHelper.mostBlogs(blogs);

    const sampleResult = {
      author: 'Jonne Jononen',
      blogs: 2,
    };

    expect(resultObject).toEqual(sampleResult);
  });

  test('mostBlogs empty array', () => {
    const resultObject = listHelper.mostBlogs(noblogs);

    expect(resultObject).toEqual({});
  });
});

describe('mostLikes tests', () => {
  test('Jonne Jononen has most likes', () => {
    const resultObject = listHelper.mostLikes(blogs);

    const sampleResult = {
      author: 'Jonne Jononen',
      likes: 20,
    };

    expect(resultObject).toEqual(sampleResult);
  });

  test('mostLikes empty array', () => {
    const resultObject = listHelper.mostLikes(noblogs);

    expect(resultObject).toEqual({});
  });
});
