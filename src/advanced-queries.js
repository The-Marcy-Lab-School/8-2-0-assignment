const knex = require('./knex');

const countNumberOfBooks = async () => {
  const query = ``;

  // const { rows } = await knex.raw(query);
  // console.log('Number of books:', rows);
  // return rows;
};

const selectAllLongOrMovieBooks = async () => {
  const query = ``;

  // const { rows } = await knex.raw(query);
  // console.log('Long or movie books:', rows);
  // return rows;
};

const selectBooksBetween150And300Pages = async () => {
  const query = ``;

  // const { rows } = await knex.raw(query);
  // console.log('150-300:', rows);
  // return rows;
};

const orderBooksByPages = async () => {
  const query = ``;

  // const { rows } = await knex.raw(query);
  // console.log('Short to long:', rows);
  // return rows;
};

const selectLongestBook = async () => {
  const query = ``;

  // const { rows } = await knex.raw(query);
  // console.log('Longest Book:', rows);
  // return rows;
};

const aliasIsMovie = async () => {
  const query = ``;

  // const { rows } = await knex.raw(query);
  // console.log('Fancy output', rows);
  // return rows;
};

const countBooksInGenres = async () => {
  const query = ``;

  // const { rows } = await knex.raw(query);
  // console.log('Genre count', rows);
  // return rows;
};

module.exports = {
  countNumberOfBooks,
  selectAllLongOrMovieBooks,
  selectBooksBetween150And300Pages,
  orderBooksByPages,
  selectLongestBook,
  aliasIsMovie,
  countBooksInGenres,
};
