# Intro To SQL Practice
- [Intro To SQL Practice](#intro-to-sql-practice)
  - [Setup](#setup)
  - [Running Queries](#running-queries)
  - [Editing Queries](#editing-queries)
  - [Returning Rows](#returning-rows)
  - [Starter Data](#starter-data)
  - [Testing](#testing)
  - [One Last Warning](#one-last-warning)
- [Basic Query Questions](#basic-query-questions)
  - [selectAllBooks](#selectallbooks)
  - [selectAllTitlesAndGenres](#selectalltitlesandgenres)
  - [selectAllBooksOver250Pages](#selectallbooksover250pages)
  - [insertDuneBook](#insertdunebook)
  - [updateShortBooksToMovies](#updateshortbookstomovies)
  - [deleteDuneBook](#deletedunebook)
- [Advanced Query Questions](#advanced-query-questions)
  - [countNumberOfBooks](#countnumberofbooks)
  - [selectAllLongOrMovieBooks](#selectalllongormoviebooks)
  - [selectBooksBetween150And300Pages](#selectbooksbetween150and300pages)
  - [orderBooksByPages](#orderbooksbypages)
  - [selectLongestBooks](#selectlongestbooks)
  - [aliasIsMovie](#aliasismovie)
  - [countBooksInGenres](#countbooksingenres)
- [Dynamic Queries](#dynamic-queries)
  - [The dangers of unescaped SQL](#the-dangers-of-unescaped-sql)
  - [Parameterized queries](#parameterized-queries)

Welcome to the world of SQL! With this assignment you'll step through some of the basic queries, some more complex ones, and finally, a few dynamic examples. But this isn't just plain SQL, we're running our queries with JavaScript. We're using a special package called [knex](https://knexjs.org) (That's *kah*-nex, like the toy). We'll talk more about it later in the week, but for now all you need to know is how to get set up and how to run your files!

## Setup
In order to connect to our database, we need some information from our environment variables. See the `.env.template` file? Make a copy called `.env` and fill out the variables. Here's the defaults, which you may need to change.

```bash
PG_HOST=127.0.0.1
PG_PORT=5432
PG_USER='postgres'
PG_PASSWORD='postgres'
PG_DATABASE='postgres'
```

These values are used by Knex (we'll learn exactly how later) to enable your Node.js code to connect to your Postgres database.

Now just make sure you run `npm install` and you should be good to go!

## Running Queries
There are 2 pairs of files you'll be working with: `basic-index.js` and `basic-queries.js`, and `advanced-index.js` and `advanced-queries.js`. You will edit the queries that are defined in the `-queries` files, and then you can run them with the `-index.js` files. Feel free to edit the behavior of the `-index.js` files by commenting out the various functions (except `closeConnection`, leave that in always).

There are also some starter queries that you shouldn't have to touch. These queries will create a table, populate it with a few rows, and then at the end, drop the table.

You'll most likely want to experiment with your queries using the `psql` command line tool. But once you are able to query for what you're looking for, copy the query into one of the `-queries.js` functions:

```js
const selectAllBooks = async () => {
  const query = `RIGHT HERE`;

  // const { rows } = await knex.raw(query);  // <-- uncomment this stuff to execute the query
  // console.log('All books:', rows);
  // return rows;
};
```

Then, uncomment out the `knex` logic to run the query.

You can experiment with the queries by running the `-index.js` files (`npm run basic` and `npm run advanced`), but using the test files will also work well (see [Testing](#testing))! 

Just know that all our files talk to the same database, so when you run the JS files, your table data will be cleared afterward. This is to keep our tests "atomic" meaning one doesn't rely on another being run first (a common problem with sloppy DB tests).

`dynamic-queries.js` and  `dynamic-index.js` are also fun, but we aren't testing you on them yet. If you finish everything, check them out last.

## Editing Queries
You only have to edit `basic-queries.js` and `advanced-queries.js`. `dynamic-queries.js` is just a reference for how `knex` deals with dynamic variables in queries. Now, that means that none of the basic or advanced queries are going to be dynamic, so why are we using backticks? Easy! Because backticks allow us to break up lines:

```js
const selectAllBooks = async () => {
  const query = `
SELECT *
FROM books
And some other
really long SQL stuff that
we want to split up;
  `;

  const { rows } = await knex.raw(query);
  console.log('All books:', rows);
  return rows;
};
```

If you want to do this on longer queries, it is easier to read.

## Returning Rows
On `SELECT` queries, you automatically get rows back from the database, that's the whole point of the query. However, on `UPDATE` and `INSERT`, that's not the default behavior. In order to avoid having to make a create or update query, and then *another* selector query, just add this to the end of the create queries:

```SQL
RETURNING *;
```

By putting this at the end of the query, you're telling the DB, "Hey, those rows you just updated/created? Please give them back to me." This is super important for us specifically because our tests are looking at what we created.

And it's already written for you, but `knex` will always return a `rows` array (even if there's only one result) from each query it makes. That's what we need to return for our tests. Except for `DELETE`, where you can see we use `rowCount` instead, but that's because we deleted our records!

## Starter Data
Like I said earlier, `starter-queries.js` is responsible for creating our tables, inserting our various books, and then dropping the table to clean up. Here's what our table will look like.

```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title text,
  genre text,
  pages int,
  is_movie boolean
);
```

The original insert query then adds 8 books to the table. Now, one of the practice questions is also an `INSERT` query, so please no peaking until you try it yourself. But anyway, this is what `knex` would return if you queried for all the books after than initial `INSERT`:

```js
[
  { id: 1, title: 'The Hobbit', genre: 'Fantasy', pages: 295, is_movie: true },
  { id: 2, title: 'The Silmarillion', genre: 'Fantasy', pages: 432, is_movie: false },
  { id: 3, title: '1984', genre: 'Sci Fi', pages: 328, is_movie: true },
  { id: 4, title: 'Brave New World', genre: 'Sci Fi', pages: 288, is_movie: false },
  { id: 5, title: 'The Martian', genre: 'Fantasy', pages: 369, is_movie: true },
  { id: 6, title: 'The Giving Tree', genre: 'Classic', pages: 64, is_movie: false },
  { id: 7, title: 'The Little Prince', genre: 'Classic', pages: 96, is_movie: false },
  { id: 8, title: 'Cat in the hat', genre: 'Classic', pages: 64, is_movie: true },
]
```
This is the data the rest of your queries will work with, so make sure you understand what it is!

Remember, you can *see* what data the test files are looking for. So if you're ever confused about exactly what you should be returning, just check the tests!

## Testing
Ok, last step, I promise. There are 3 different test commands:

```bash
npm run test
npm run tes:wb
npm run test:wa
```
`test` runs all the test files, `test:wb` runs jest in "watch" mode on the basic tests, and `test:wa` runs jest in watch mode on the advanced tests. Remember, watch mode means the tests will automatically rerun whenever you save a change in one of your files. It's a pretty handy mode!

## One Last Warning
- Remember Postgres cares about quotations marks, so use `'` instead of `"` right now.

# Basic Query Questions

## selectAllBooks
Write a query that returns all the columns on every book in the table. So essentially, your output (except the ids) should match the starter data.

## selectAllTitlesAndGenres
Write a query that returns only the title and genre columns on every book in the table.

## selectAllBooksOver250Pages
Write a query that returns all columns on every book in the table that has more than 250 pages.

## insertDuneBook
Write a query that inserts the following row into the table:

```bash
title = 'Dune'
genre = 'Sci Fi',
pages = 500,
is_movie = false
```

Don't forget about `RETURNING *`!

## updateShortBooksToMovies
Write a query that sets `is_movie` to `true` for any book that has fewer than 150 pages.

Don't forget about `RETURNING *`!

## deleteDuneBook
Write a query that deletes the Dune book that you just added.


# Advanced Query Questions
Alright, if all your tests are passing for the basic queries, let's now try our hand at some of the more advanced things we can do with SQL.

## countNumberOfBooks
Write are query that returns *just* the number of books in the table. The expected JS output from this query should be

```js
{ count: 8 }
```

There's a special SQL function that does just that, can you find it?

## selectAllLongOrMovieBooks
Write a query that returns all columns on all books that have *either* 250+ pages, *or* have `is_movie` set to `true`.


## selectBooksBetween150And300Pages
Write a query that returns all columns on all books that have more than 150 pages, but also less than 300.

## orderBooksByPages
Write a query that returns all columns on all books on the table, but returns them in the order of shortest to longest.

Note: While you *can* order the rows array with JS, please don't. This is something SQL can do really quickly, and it will keep your code complexity down.

## selectLongestBooks
write a query that returns all the columns on the one book in the DB that has the most pages.

Note: Again, while you can query for all the books, and then use JS to find the longest, please don't. That's called "over fetching" from the DB, we don't need all the books, just one!

## aliasIsMovie
Write a query that returns only the title and `is_movie` columns, but with a twist. Instead of the ugly `is_movie` name, lets alias it in the query to be called `Already Filmed`.

## countBooksInGenres
Write a query that returns only the count of each genre of book in the table. So the final JS output on the started data would be:

```js
[
  { genre: 'Fantasy', count: '3' },
  { genre: 'Classic', count: '3' },
  { genre: 'Sci Fi', count: '2' },
]
```

Hint: There's a cool SQL function called `GROUP BY`. It would be wise to look it up, ok?

# Dynamic Queries
Ok, so if you've gotten everything done with the other tests, you should experiment with the dynamic queries. Run the queries by doing `npm run dynamic`.

## The dangers of unescaped SQL
So, you may be thinking "Dynamic queries are easy, I'll just interpolate in the data!" But, that line of thinking has cost companies literally billions of dollars. Why? Because of SQL injection attacks.

See, you can run more than one query at a time in SQL, you just separate them out with the `;`. However, this means that people can "inject" unwanted code into our queries. Look at the dangerous query:

```js
const id = `1; UPDATE books SET title = 'HAHAHACKED'`;

const query = `SELECT * FROM books WHERE id = ${id};`;
await knex.raw(query);

const { rows } = await knex.raw('SELECT id, title FROM books');
console.log('Hacked output', rows);
```

That `1; UPDATE...` is totally valid SQL. But, obviously that's not what we want! When we look at the output, suddenly every title in our table has been incorrectly set. This example is mild, someone could also just destroy your entire DB by `DROP`ing all the tables.

(Relevant [xkcd comic](https://xkcd.com/327/))

## Parameterized queries
That's why all SQL adapters like knex have a way of "escaping" the input data with their queries. "Escaping" means the SQL keywords no longer have any syntactic power, they just become strings. With `knex` the way we do this is:

```js
const safeDynamicQuery = async (id) => {
  const query = `SELECT * FROM books WHERE id = ?;`;
  const { rows } = await knex.raw(query, [id]);

  console.log('Fancy output', rows);
  return rows;
};
```

That `?` is a stand in value for our data. Which we pass in via an ordered array. If we have more than one piece of data, then you just pass them all along into the array

```js
const multipleDynamicParamsQuery = async (pages, isMovie) => {
  const query = `SELECT * FROM books WHERE pages > ? AND is_movie = ?;`;

  const { rows } = await knex.raw(query, [pages, isMovie]);
  console.log('Multiple Dynamic Query', rows);
  return rows;
};
```

You might also see queries using `$1`, `$2`... instead. It depends on the SQL implementation. But `?` works for `knex` across the board.

This kind of dynamic query is obviously extremely useful. And `knex` can do much more than just `raw` queries like this. But for now, practice using dynamic queries by writing some of your own. Can you create any new versions of the basic and advanced queries that use parameters?
