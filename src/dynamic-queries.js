const knex = require('./knex');

const dangerousDynamicQuery = async () => {
  const id = `1; UPDATE books SET title = 'HAHAHACKED'`;

  const query = `SELECT * FROM books WHERE id = ${id};`;
  await knex.raw(query);

  const { rows } = await knex.raw('SELECT id, title FROM books');
  console.log('Hacked output', rows);
  return rows;
};

const safeDynamicQuery = async (id) => {
  const query = `SELECT * FROM books WHERE id = ?;`;
  const { rows } = await knex.raw(query, [id]);

  console.log('Fancy output', rows);
  return rows;
};

const multipleDynamicParamsQuery = async (pages, isMovie) => {
  const query = `SELECT * FROM books WHERE pages > ? AND is_movie = ?;`;

  const { rows } = await knex.raw(query, [pages, isMovie]);
  console.log('Multiple Dynamic Query', rows);
  return rows;
};

module.exports = {
  dangerousDynamicQuery,
  safeDynamicQuery,
  multipleDynamicParamsQuery,
};
