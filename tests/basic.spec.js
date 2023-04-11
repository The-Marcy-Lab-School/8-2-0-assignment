const path = require('path');
const ScoreCounter = require('score-tests');
const {
  createTable,
  closeConnection,
  insertMultipleBooks,
  truncate,
} = require('../src/starter-queries');

const {
  selectAllBooks,
  selectAllTitlesAndGenres,
  selectAllBooksOver250Pages,
  insertDuneBook,
  updateShortBooksToMovies,
  deleteDuneBook,
} = require('../src/basic-queries');

const {
  safeDynamicQuery,
} = require('../src/dynamic-queries');

const testSuiteName = 'Basic Queries';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  beforeAll(async () => { await createTable().catch(() => []); });
  beforeEach(async () => {
    await insertMultipleBooks();
    scoreCounter.add(expect);
  });
  afterEach(async () => { await truncate(); });

  it('Selects all books', async () => {
    const books = await selectAllBooks();
    expect(books).toEqual([
      { id: expect.any(Number), title: 'The Hobbit', genre: 'Fantasy', pages: 295, is_movie: true },
      { id: expect.any(Number), title: 'The Silmarillion', genre: 'Fantasy', pages: 432, is_movie: false },
      { id: expect.any(Number), title: '1984', genre: 'Sci Fi', pages: 328, is_movie: true },
      { id: expect.any(Number), title: 'Brave New World', genre: 'Sci Fi', pages: 288, is_movie: false },
      { id: expect.any(Number), title: 'The Martian', genre: 'Fantasy', pages: 369, is_movie: true },
      { id: expect.any(Number), title: 'The Giving Tree', genre: 'Classic', pages: 64, is_movie: false },
      { id: expect.any(Number), title: 'The Little Prince', genre: 'Classic', pages: 96, is_movie: false },
      { id: expect.any(Number), title: 'Cat in the hat', genre: 'Classic', pages: 64, is_movie: true },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Selects all titles and genres', async () => {
    const titlesAndGenres = await selectAllTitlesAndGenres();
    expect(titlesAndGenres).toEqual([
      { title: 'The Hobbit', genre: 'Fantasy' },
      { title: 'The Silmarillion', genre: 'Fantasy' },
      { title: '1984', genre: 'Sci Fi' },
      { title: 'Brave New World', genre: 'Sci Fi' },
      { title: 'The Martian', genre: 'Fantasy' },
      { title: 'The Giving Tree', genre: 'Classic' },
      { title: 'The Little Prince', genre: 'Classic' },
      { title: 'Cat in the hat', genre: 'Classic' },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Selects all books over 250 pages', async () => {
    const books = await selectAllBooksOver250Pages();
    expect(books).toEqual([
      { id: expect.any(Number), title: 'The Hobbit', genre: 'Fantasy', pages: 295, is_movie: true },
      { id: expect.any(Number), title: 'The Silmarillion', genre: 'Fantasy', pages: 432, is_movie: false },
      { id: expect.any(Number), title: '1984', genre: 'Sci Fi', pages: 328, is_movie: true },
      { id: expect.any(Number), title: 'Brave New World', genre: 'Sci Fi', pages: 288, is_movie: false },
      { id: expect.any(Number), title: 'The Martian', genre: 'Fantasy', pages: 369, is_movie: true },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Inserts Dune book', async () => {
    const [dune] = await insertDuneBook();
    expect(dune).toEqual(
      { id: expect.any(Number), title: 'Dune', genre: 'Sci Fi', pages: 500, is_movie: false },
    );

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Updates short books to movies', async () => {
    const updatedBooks = await updateShortBooksToMovies();
    expect(updatedBooks).toEqual([
      { id: expect.any(Number), title: 'The Giving Tree', genre: 'Classic', pages: 64, is_movie: true },
      { id: expect.any(Number), title: 'The Little Prince', genre: 'Classic', pages: 96, is_movie: true },
      { id: expect.any(Number), title: 'Cat in the hat', genre: 'Classic', pages: 64, is_movie: true },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Deletes Dune book', async () => {
    const nothingToDelete = await deleteDuneBook();
    expect(nothingToDelete.rowCount).toEqual(0);

    const [duneBook] = await insertDuneBook();

    const successfulDelete = await deleteDuneBook();
    expect(successfulDelete.rowCount).toEqual(1);

    const [shouldNotBeDune] = await safeDynamicQuery(duneBook.id);
    expect(shouldNotBeDune).toBeFalsy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  afterAll(async () => {
    await closeConnection();
    scoreCounter.export();
  });
});
