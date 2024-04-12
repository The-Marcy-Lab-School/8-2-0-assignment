const {
  createTable,
  truncate,
  closeConnection,
  insertMultipleBooks,
} = require('./starter-queries');

const {
  countNumberOfBooks,
  selectAllLongOrMovieBooks,
  selectBooksBetween150And300Pages,
  orderBooksByPages,
  selectLongestBook,
  aliasIsMovie,
  countBooksInGenres,
} = require('./advanced-queries');

const main = async () => {
  // ---- DO NOT DELETE ----
  // Setup the tables and insert the books
  await createTable().catch(() => 'Table created');
  await insertMultipleBooks();



  // ---- YOUR WORK ----
  // Advanced queries
  // Test your functions by console logging the returned value.
  const numberOfBooks = await countNumberOfBooks();
  const longOrMovieBooks = await selectAllLongOrMovieBooks();
  const mediumBooks = await selectBooksBetween150And300Pages();
  const orderedBooks = await orderBooksByPages();
  const longestBook = await selectLongestBook();
  const aliasedTitleAndIsMovie = await aliasIsMovie();
  const genreCounts = await countBooksInGenres();



  // ---- DO NOT DELETE ----
  // We remove the table rows (not the table) so we can run the queries again
  // without the database getting too big
  await truncate();

  // We have to close the connection when we're done
  closeConnection();
};

main();
