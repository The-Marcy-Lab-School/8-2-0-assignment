const path = require('path');
const ScoreCounter = require('score-tests');
const {
  createTable,
  closeConnection,
  insertMultipleBooks,
  truncate,
} = require('../src/starter-queries');

const {
  countNumberOfBooks,
  selectAllLongOrMovieBooks,
  selectBooksBetween150And300Pages,
  orderBooksByPages,
  selectLongestBook,
  aliasIsMovie,
  countBooksInGenres,
} = require('../src/advanced-queries');

const testSuiteName = 'Advanced Queries';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  beforeAll(async () => { await createTable().catch(() => []); });
  beforeEach(async () => {
    await insertMultipleBooks();
    scoreCounter.add(expect);
  });
  afterEach(async () => { await truncate(); });

  it('Counts the number of books', async () => {
    const [{ count }] = await countNumberOfBooks();
    expect(Number(count)).toEqual(8);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Selects all long or movie books', async () => {
    const books = await selectAllLongOrMovieBooks();
    expect(books).toEqual([
      { id: expect.any(Number), title: 'The Hobbit', genre: 'Fantasy', pages: 295, is_movie: true },
      { id: expect.any(Number), title: 'The Silmarillion', genre: 'Fantasy', pages: 432, is_movie: false },
      { id: expect.any(Number), title: '1984', genre: 'Sci Fi', pages: 328, is_movie: true },
      { id: expect.any(Number), title: 'Brave New World', genre: 'Sci Fi', pages: 288, is_movie: false },
      { id: expect.any(Number), title: 'The Martian', genre: 'Fantasy', pages: 369, is_movie: true },
      { id: expect.any(Number), title: 'Cat in the hat', genre: 'Classic', pages: 64, is_movie: true },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Selects books between 150 and 300 pages', async () => {
    const books = await selectBooksBetween150And300Pages();
    expect(books).toEqual([
      { id: expect.any(Number), title: 'The Hobbit', genre: 'Fantasy', pages: 295, is_movie: true },
      { id: expect.any(Number), title: 'Brave New World', genre: 'Sci Fi', pages: 288, is_movie: false },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Orders books by pages', async () => {
    const books = await orderBooksByPages();
    expect(books).toEqual([
      { id: expect.any(Number), title: 'The Giving Tree', genre: 'Classic', pages: 64, is_movie: false },
      { id: expect.any(Number), title: 'Cat in the hat', genre: 'Classic', pages: 64, is_movie: true },
      { id: expect.any(Number), title: 'The Little Prince', genre: 'Classic', pages: 96, is_movie: false },
      { id: expect.any(Number), title: 'Brave New World', genre: 'Sci Fi', pages: 288, is_movie: false },
      { id: expect.any(Number), title: 'The Hobbit', genre: 'Fantasy', pages: 295, is_movie: true },
      { id: expect.any(Number), title: '1984', genre: 'Sci Fi', pages: 328, is_movie: true },
      { id: expect.any(Number), title: 'The Martian', genre: 'Fantasy', pages: 369, is_movie: true },
      { id: expect.any(Number), title: 'The Silmarillion', genre: 'Fantasy', pages: 432, is_movie: false },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Selects the longest book', async () => {
    const [book] = await selectLongestBook();
    expect(book).toEqual({
      id: expect.any(Number),
      title: 'The Silmarillion',
      genre: 'Fantasy',
      pages: 432,
      is_movie: false,
    });

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Aliases is_movie to "Already Filmed"', async () => {
    const books = await aliasIsMovie();
    expect(books).toEqual([
      { title: 'The Hobbit', 'Already Filmed': true },
      { title: 'The Silmarillion', 'Already Filmed': false },
      { title: '1984', 'Already Filmed': true },
      { title: 'Brave New World', 'Already Filmed': false },
      { title: 'The Martian', 'Already Filmed': true },
      { title: 'The Giving Tree', 'Already Filmed': false },
      { title: 'The Little Prince', 'Already Filmed': false },
      { title: 'Cat in the hat', 'Already Filmed': true },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Counts the number of books in each genre', async () => {
    const books = await countBooksInGenres();
    expect(books).toEqual([
      { genre: 'Fantasy', count: '3' },
      { genre: 'Classic', count: '3' },
      { genre: 'Sci Fi', count: '2' },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  afterAll(async () => {
    await closeConnection();
    scoreCounter.export();
  });
});
