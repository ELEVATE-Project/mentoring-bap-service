'use strict'
const { DataTypes } = require('sequelize')
const postgresdb = require('@configs/postgres')

const User = postgresdb.define('User', {
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false
	},
	hash: {
		type: DataTypes.STRING,
		allowNull: false
	},
	salt: {
		type: DataTypes.STRING,
		allowNull: false
	},
}, {
	timestamps: false
})

module.exports = User
