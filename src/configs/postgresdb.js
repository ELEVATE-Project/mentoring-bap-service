// const { Client } = require('pg');

// const client = new Client({
//   host: 'postgres',
//   port: 5432,
//   user: 'postgres',
//   password: 'mysecretpassword',
//   database: 'postgres'
// });

// client.connect()
// .then(() => console.log("Connected to PostgreSQL"))
// .catch(err => console.error('Connection error', err.stack));


'use strict'
let Sequelize = require('sequelize')

const initializePostgres = () => {
    const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        define: {
            timestamps: true, // Enables automatic 'createdAt' and 'updatedAt' fields
            underscored: true, // Converts all camelCased columns to underscored
        },
        logging: false, // Disables Sequelize logging to console
    })

    return sequelize
}

const postgresdb = initializePostgres()

postgresdb.authenticate()
    .then(() => console.log('PostgreSQL Connected'))
    .catch(err => console.error('Unable to connect to PostgreSQL:', err))

module.exports = postgresdb
