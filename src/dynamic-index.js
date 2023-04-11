const {
  createTable,
  truncate,
  closeConnection,
  insertMultipleBooks,
} = require('./starter-queries');

const {
  dangerousDynamicQuery,
  // safeDynamicQuery,
  // multipleDynamicParamsQuery,
} = require('./dynamic-queries');

const main = async () => {
  await createTable().catch(() => 'Table created');
  await insertMultipleBooks();

  // These are already filled out, but we encourage you
  // to play around with them!

  /* This is why we don't use straight string interpolation! */
  await dangerousDynamicQuery();

  /* These are safe because we use parameterized queries
  which are sanitized by knex */
  // await safeDynamicQuery(2);
  // await multipleDynamicParamsQuery(100, true);

  // We remove the table rows (not the table) so we can run the queries again
  // without the database getting too big
  await truncate();

  // We have to close the connection when we're done
  closeConnection();
};

main();
