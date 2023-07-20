'use strict'
const { DataTypes } = require('sequelize')
const sequelize = require('@configs/sequelize')

const Profile = sequelize.define('Profile', {
	userId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		unique: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: false,
	}
}, {
	timestamps: true,
	underscored: true,
	freezeTableName: true
})

module.exports = Profile
