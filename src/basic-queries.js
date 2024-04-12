const knex = require('./knex');

/* The knex object above has a knex.raw method that
can be used to execute SQL queries. It will return an
object with a .rows property which will ALWAYS be an
Array containing the requested data (even if only 1 row
was returned).
*/

const selectAllBooks = async () => {
  const query = ``;

  // const { rows } = await knex.raw(query);
  // return rows;
};

const selectAllTitlesAndGenres = async () => {
  const query = ``;

  // const { rows } = await knex.raw(query);
  // return rows;
};

const selectAllBooksOver250Pages = async () => {
  const query = ``;

  // const { rows } = await knex.raw(query);
  // return rows;
};

const insertDuneBook = async () => {
  const query = ` 
    YOUR QUERY HERE
    RETURNING *;
  `;

  // const { rows } = await knex.raw(query);
  // return rows;
};

const updateShortBooksToMovies = async () => {
  const query = ` 
    YOUR QUERY HERE
    RETURNING *;
  `;

  // const { rows } = await knex.raw(query);
  // return rows;
};

const deleteDuneBook = async () => {
  const query = ``;

  // const { rowCount } = await knex.raw(query);
  // return { rowCount };
};

module.exports = {
  selectAllBooks,
  selectAllTitlesAndGenres,
  selectAllBooksOver250Pages,
  insertDuneBook,
  updateShortBooksToMovies,
  deleteDuneBook,
};
