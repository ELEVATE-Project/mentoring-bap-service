const { Client } = require('pg');

const client = new Client({
  host: 'postgres',
  port: 5432,
  user: 'postgres',
  password: 'mysecretpassword',
  database: 'postgres'
});

client.connect()
.then(() => console.log("Connected to PostgreSQL"))
.catch(err => console.error('Connection error', err.stack));
