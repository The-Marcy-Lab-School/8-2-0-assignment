const {
  createTable,
  dropTable,
  closeConnection,
  insertMultipleBooks,
} = require('./starter-queries');

const {
  selectAllBooks,
  selectAllTitlesAndGenres,
  selectAllBooksOver250Pages,
  insertDuneBook,
  updateShortBooksToMovies,
  deleteDuneBook,
} = require('./basic-queries');

const main = async () => {
  await createTable().catch(() => 'Table created');
  await insertMultipleBooks();

  // Core queries, get these first
  await selectAllBooks();
  await selectAllTitlesAndGenres();
  await selectAllBooksOver250Pages();
  await insertDuneBook();
  await updateShortBooksToMovies();
  await deleteDuneBook();

  // We drop the table so we can recreate it and run the queries again
  // without the database getting too unwieldy
  await dropTable();

  // We have to close the connection when we're done
  closeConnection();
};

main();
