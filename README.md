# Intro To SQL Practice

Welcome to the world of SQL! With this assignment you'll step through some of the basic queries, some more complex ones, and finally, a few dynamic examples. But this isn't just plain SQL, we're running our queries with JavaScript!

**Table of Contents:**
- [Setup](#setup)
  - [Postgres Setup](#postgres-setup)
  - [Knex Setup](#knex-setup)
- [The Assignment](#the-assignment)
  - [Dataset](#dataset)
  - [What you will be writing](#what-you-will-be-writing)
  - [Writing Multiline Queries](#writing-multiline-queries)
  - [Testing](#testing)
- [Basic Query Questions](#basic-query-questions)
  - [1) selectAllBooks](#1-selectallbooks)
  - [2) selectAllTitlesAndGenres](#2-selectalltitlesandgenres)
  - [3) selectAllBooksOver250Pages](#3-selectallbooksover250pages)
  - [4) insertDuneBook](#4-insertdunebook)
  - [5) updateShortBooksToMovies](#5-updateshortbookstomovies)
  - [6) deleteDuneBook](#6-deletedunebook)
- [Advanced Query Questions](#advanced-query-questions)
  - [7) countNumberOfBooks](#7-countnumberofbooks)
  - [8) selectAllLongOrMovieBooks](#8-selectalllongormoviebooks)
  - [9) selectBooksBetween150And300Pages](#9-selectbooksbetween150and300pages)
  - [10) orderBooksByPages](#10-orderbooksbypages)
  - [11) selectLongestBooks](#11-selectlongestbooks)
  - [12) aliasIsMovie](#12-aliasismovie)
  - [13) countBooksInGenres](#13-countbooksingenres)
- [Dynamic Queries](#dynamic-queries)
  - [The dangers of unescaped SQL](#the-dangers-of-unescaped-sql)
  - [Parameterized queries](#parameterized-queries)

## Setup

Clone down your assignment repo, `cd` into it and run `npm install`

### Postgres Setup

Before we begin, check out the [Postgres Setup](https://github.com/The-Marcy-Lab-School/postgres-setup) instructions. You can refer to these setup steps later if you need to change any of your Postgres settings.

Once you have set up Postgres, make sure that the Postgres server is running. 

Then, connect to your Postgres server using either
* The terminal and the `psql` command
* TablePlus

Finally, create a new database called `sql_practice`.

### Knex Setup

In this assignment, we're using a package called [knex](https://knexjs.org) (sounds like "connect" but "conneX"). Knex is a tool that let's us execute SQL queries using JavaScript.

In order for Knex to connect to our database, we need to provide:

* Where the database is running (host and port)
* A username and password to connect to the database server
* The name of the specific database we want to use

To do this, we will provide **environment variables**. See the `.env.template` file? Make a copy of it called `.env` and fill out the variable values according to your Postgres setup. 

```bash
PG_HOST=127.0.0.1
PG_PORT=5432
PG_USER='postgres'
PG_PASSWORD='your password. is it 123?'
PG_DATABASE='sql_practice'
```

**Hint: You may want to open TablePlus to identify (or create) the database that you will use for this assignment.**

These values are used by Knex in your Node application to connect to your Postgres database, thus letting you send SQL queries to your database using JavaScript.

**Before you continue:** To test that this works, run `node src/basic-index.js`. You should see `All Books: undefined` and no errors.

## The Assignment

### Dataset

For this assignment, you will be working with a table called `books`. Here's what our table will look like.

```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title text,
  genre text,
  pages int,
  is_movie boolean
);
```

This table is created by the file `starter-queries.js` which also inserts 8 books to the table. 

> ⚠️ One of the practice questions is also an `INSERT` query, so please no peaking until you try it yourself. 

This is what `knex` would return if you queried for all the books after than initial `INSERT`:

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

Remember, you can always *see* the exact data that the tests are looking for. So if you're ever confused about what your query functions should be returning, just check the tests!

### What you will be writing

There are 2 pairs of files you'll be working with: 
1. `basic-queries.js` and `basic-index.js`
2. `advanced-queries.js` and `advanced-index.js`
3. `dynamic-queries.js` and  `dynamic-index.js` are also fun, but we aren't testing you on them yet. If you finish everything, check them out last.

You will edit the queries defined in the `-queries` files and those will be the files that are tested.

In those files, you will find functions with a `query` string and some commented code. For each function, fill out the `query` string and then uncomment the `knex` logic to run the query.

```js
const selectAllBooks = async () => {
  const query = `RIGHT HERE`;

  // ⬇️ uncomment this stuff to execute the query
  // const { rows } = await knex.raw(query);  
  // return rows;
};
```

To experiment with the queries you've written, you can run the corresponding `-index.js` files (check out the `npm run basic` and `npm run advanced` commands in `package.json`). Feel free to add `console.log` statements to this file so that you can test the output of each of your query functions. We've already provided a `console.log` for the `allBooks` value:

```js
// ---- YOUR WORK ----
// Core queries, get these first
const allBooks = await selectAllBooks();
const allTitlesAndGenres = await selectAllTitlesAndGenres();
const allLongBooks = await selectAllBooksOver250Pages();
const duneBook = await insertDuneBook();
const updatedShortMovies = await updateShortBooksToMovies();
const deleted = await deleteDuneBook();

// Test your functions by console logging the returned value.
console.log('All Books:', allBooks);
```

Once you are satisfied with the result, confirm your work by running the provided tests (see [Testing](#testing))! 

> **Why is the data being cleared from the database?**
>
> If you are running these query files and you open up TablePlus, you may notice that the data isn't showing up at all in the `sql_practice` database. That's because we delete the tables at the end of each `-index.js` file (using the `truncate()` function). This is because all of our files use the same database and by deleting the table after one file finishes, and then recreating it again from scratch when the next file runs, we can keep our tests "atomic" — meaning the order of our file execution doesn't matter (a common problem with sloppy DB tests).

### Writing Multiline Queries
You may notice that in the `-queries.js` files, we are using backticks. Why? Because backticks allow us to break up lines:

```js
const selectAllBooks = async () => {
  const query = `
    SELECT *
    FROM books
    WHERE pages > 50
    AND genre = "Classic"
    OR genre = "Sci Fi"
    RETURNING *;
  `;

  const { rows } = await knex.raw(query);
  return rows;
};
```

Each line begins with a new SQL command (in all caps) making it easy to read each part of the query.

We could also write the query as a one-line string but it just isn't as readable:

```js
const query = 'SELECT * FROM books WHERE pages > 50 AND genre = "Classic" OR genre = "Sci Fi" RETURNING *;'
```

### Testing
Ok, last step, I promise. There are 3 different test commands:

```bash
npm run test
npm run tes:wb
npm run test:wa
```
`test` runs all the test files, `test:wb` runs jest in "watch" mode on the basic tests, and `test:wa` runs jest in watch mode on the advanced tests. Remember, watch mode means the tests will automatically rerun whenever you save a change in one of your files. It's a pretty handy mode!

## Basic Query Questions

### 1) selectAllBooks
Write a query that returns all the columns on every book in the table. So essentially, your output (except the ids) should match the starter data.

- Remember Postgres cares about quotations marks, so use `'` instead of `"` right now.

### 2) selectAllTitlesAndGenres
Write a query that returns only the title and genre columns on every book in the table.

### 3) selectAllBooksOver250Pages
Write a query that returns all columns on every book in the table that has more than 250 pages.

### 4) insertDuneBook
Write a query that inserts the following row into the table:

```bash
title = 'Dune'
genre = 'Sci Fi',
pages = 500,
is_movie = false
```

**⚠️ Note about `RETURNING *`** (read me!)
> On `SELECT` queries, you automatically get rows back from the database, that's the whole point of the query. However, on `UPDATE` and `INSERT`, that's not the default behavior. In order to avoid having to make a create or update query, and then *another* selector query, just add this to the end of the create queries:
> 
> ```SQL
> RETURNING *;
> ```
> 
> By putting this at the end of the query, you're telling the DB, "Hey, those rows you just updated/created? Please give them back to me." This is super important for us specifically because our tests are looking at what we created.
> 
> And it's already written for you, but `knex` will always return a `rows` array (even if there's only one result) from each query it makes. That's what we need to return for our tests. Except for `DELETE`, where you can see we use `rowCount` instead, but that's because we deleted our records!>

### 5) updateShortBooksToMovies
Write a query that sets `is_movie` to `true` for any book that has fewer than 150 pages.

Don't forget about `RETURNING *`!

### 6) deleteDuneBook
Write a query that deletes the Dune book that you just added.


## Advanced Query Questions
Alright, if all your tests are passing for the basic queries, let's now try our hand at some of the more advanced things we can do with SQL.

### 7) countNumberOfBooks
Write are query that returns *just* the number of books in the table. The expected JS output from this query should be

```js
{ count: 8 }
```

There's a special SQL function that does just that, can you find it?

### 8) selectAllLongOrMovieBooks
Write a query that returns all columns on all books that have *either* 250+ pages, *or* have `is_movie` set to `true`.


### 9) selectBooksBetween150And300Pages
Write a query that returns all columns on all books that have more than 150 pages, but also less than 300.

### 10) orderBooksByPages
Write a query that returns all columns on all books on the table, but returns them in the order of shortest to longest.

Note: While you *can* order the rows array with JS, please don't. This is something SQL can do really quickly, and it will keep your code complexity down.

### 11) selectLongestBooks
write a query that returns all the columns on the one book in the DB that has the most pages.

Note: Again, while you can query for all the books, and then use JS to find the longest, please don't. That's called "over fetching" from the DB, we don't need all the books, just one!

### 12) aliasIsMovie
Write a query that returns only the title and `is_movie` columns, but with a twist. Instead of the ugly `is_movie` name, lets alias it in the query to be called `Already Filmed`.

### 13) countBooksInGenres
Write a query that returns only the count of each genre of book in the table. So the final JS output on the started data would be:

```js
[
  { genre: 'Fantasy', count: '3' },
  { genre: 'Classic', count: '3' },
  { genre: 'Sci Fi', count: '2' },
]
```

Hint: There's a cool SQL function called `GROUP BY`. It would be wise to look it up, ok?

## Dynamic Queries
Ok, so if you've gotten everything done with the other tests, you should experiment with the dynamic queries. Run the queries by doing `npm run dynamic`.

### The dangers of unescaped SQL
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

### Parameterized queries
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
