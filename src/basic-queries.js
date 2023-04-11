const knex = require('./knex');

const selectAllBooks = async () => {
  const query = ``;

  // const { rows } = await knex.raw(query);
  // console.log('All books:', rows);
  // return rows;
};

const selectAllTitlesAndGenres = async () => {
  const query = ``;

  // const { rows } = await knex.raw(query);
  // console.log('All titles, genres:', rows);
  // return rows;
};

const selectAllBooksOver250Pages = async () => {
  const query = ``;

  // const { rows } = await knex.raw(query);
  // console.log('Long books:', rows);
  // return rows;
};

const insertDuneBook = async () => {
  const query = ` RETURNING *;`;

  // const { rows } = await knex.raw(query);
  // console.log('Inserted Dune:', rows);
  // return rows;
};

const updateShortBooksToMovies = async () => {
  const query = ` RETURNING *;`;

  // const { rows } = await knex.raw(query);
  // console.log('Newly filmed books:', rows);
  // return rows;
};

const deleteDuneBook = async () => {
  const query = ``;

  // const { rowCount } = await knex.raw(query);
  // console.log('Number of deleted Rows', rowCount);
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
