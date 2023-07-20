'use strict'
const { DataTypes, Model } = require('sequelize')
const postgresdb = require('@configs/postgres')

const STATUS = {
	ACTIVE: 'active',
	COMPLETED: 'completed',
	CANCELLED: 'cancelled',
}

class ItemAttendance extends Model {}

ItemAttendance.init({
	userMongoId: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: 'User', // name of your model, typically the table name in Postgres
			key: 'id',
		},
	},
	itemMongoId: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: 'Item', // name of your model, typically the table name in Postgres
			key: 'id',
		},
	},
	orderId: {
		type: DataTypes.STRING,
		allowNull: false
	},
	status: {
		type: DataTypes.ENUM(Object.values(STATUS)),
		defaultValue: STATUS.ACTIVE,
	},
	type: {
		type: DataTypes.STRING,
		defaultValue: 'mentor',
	},
	rating: {
		type: DataTypes.INTEGER,
		validate: { min: 1, max: 5 },
	},
	joinLink: {
		type: DataTypes.STRING,
	},
}, {
	sequelize: postgresdb,
	modelName: 'ItemAttendance',
	underscored: true,
	timestamps: true
})

module.exports = ItemAttendance
