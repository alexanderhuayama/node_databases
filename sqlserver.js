'use strict';

const env = require('./config/env');
const sql = require('mssql');

(async () => {
  // Open connection
  const connection = await sql.connect({
    server: env.database.host,
    user: env.database.username,
    password: env.database.password,
    database: env.database.dbname
  });

  try {
    // Executing querys

    // Insert
    const result = await connection.request()
                                   .input('name','User 1')
                                   .input('email','user1@email.com')
                                   .query(`insert into tb_users (name, email) values (@name, @email); select @@identity as insertId`);

    // Show result
    console.log('*** RESULT_INSERT_SQLSERVER ***');
    console.log('Id insert :', result.recordset[0].insertId);
    console.log('Affected rows :', result.rowsAffected[0], '\n');

    // Select
    const resultSelect = await connection.request().query('select id, name, email from tb_users');
    const users = resultSelect.recordset;

    // Show result
    console.log('*** RESULT_SELECT_SQLSERVER ***');
    for (let user of users) {
      console.log('Id :', user.id);
      console.log('Name :', user.name);
      console.log('Email :', user.email, '\n');
    }

  } catch (error) {
    console.log(`SQLSERVER_ERROR:\n${error}`)
  } finally {
    await connection.close();
  }
})();
