/* 
This file uses the .env file you created to create a connection
with your Postgres database. It then exports a `knex` object
which can be used to execute SQL queries using that connection
*/

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config);
module.exports = knex;
