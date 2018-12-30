'use strict';

const env = require('./config/env');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: env.database.host,
  user: env.database.username,
  password: env.database.password,
  database: env.database.dbname
});

// Open connection
connection.connect();

// Executing querys

// Insert
const users = [];

users.push(['User 1', 'user1@email.com']);
users.push(['User 2', 'user2@email.com']);

connection.query('insert into tb_users (name, email) values ?', [users], (error, result) => {
  if (error) throw `MYSQL_ERROR: \n${error.sql}`;

  // Show result
  console.log('*** RESULT_INSERT_MYSQL ***');
  console.log('Id insert :', result.insertId);
  console.log('Affected rows :', result.affectedRows, '\n');
});

// Select
connection.query('select id, name, email from tb_users', (error, users) => {
  if (error) throw `MYSQL_ERROR: \n${error}`;

  // Show result
  console.log('*** RESULT_SELECT_MYSQL ***');
  for (let user of users) {
    console.log('Id :', user.id);
    console.log('Name :', user.name);
    console.log('Email :', user.email, '\n');
  }

  process.exit(0);
});

process.on('exit', () => {
  // Close connection
  connection.end();
});

