'use strict';

const env = require('./config/env');
const pg = require('pg');
const client = new pg.Client({
  host: env.database.host,
  user: env.database.username,
  password: env.database.password,
  database: env.database.dbname
});

// Open connection
client.connect();

// Executing querys

// Insert
const user = ['User 1', 'user1@email.com'];

client.query('insert into tb_users (name, email) values ($1, $2) RETURNING id', user)
  .then(result => {
    // Show result
    console.log('*** RESULT_INSERT_POSTGRES ***');
    console.log('Id insert :', result.rows[0].id);
    console.log('Affected rows :', result.rowCount, '\n');
  })
  .catch(error => {
    console.log('*** ERROR_POSTGRES ***')
    console.log(error);
  });

// Select
client.query('select id, name, email from tb_users')
  .then(result => {
    const users = result.rows;

    // Show result
    console.log('*** RESULT_SELECT_POSTGRES ***');
    for (let user of users) {
      console.log('Id :', user.id);
      console.log('Name :', user.name);
      console.log('Email :', user.email, '\n');
    }

    process.exit('0');
  })
  .catch(error => {
    console.log('*** ERROR_POSTGRES ***')
    console.log(error);
  });


process.on('exit', () => {
  // Close connection
  client.end();
});
