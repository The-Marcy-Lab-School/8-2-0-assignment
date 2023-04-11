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
  await createTable().catch(() => 'Table created');
  await insertMultipleBooks();

  // Advanced queries
  await countNumberOfBooks();
  await selectAllLongOrMovieBooks();
  await selectBooksBetween150And300Pages();
  await orderBooksByPages();
  await selectLongestBook();
  await aliasIsMovie();
  await countBooksInGenres();

  // We remove the table rows (not the table) so we can run the queries again
  // without the database getting too big
  await truncate();

  // We have to close the connection when we're done
  closeConnection();
};

main();
