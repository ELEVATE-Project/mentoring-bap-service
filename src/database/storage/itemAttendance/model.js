'use strict'
const mongoose = require('mongoose')
const mongooseLeanGetter = require('mongoose-lean-getters')
const db = require('@configs/mongodb')
const { ObjectId } = require('mongodb')

const STATUS = {
	ACTIVE: 0,
	COMPLETED: 1,
	CANCELLED: 2,
}

const itemAttendanceSchema = new mongoose.Schema({
	userMongoId: {
		type: ObjectId,
		required: true,
	},
	itemMongoId: {
		type: ObjectId,
		required: true,
	},
	orderId: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: 'active',
	},
	type: {
		type: String,
		required: true,
		default: 'mentor',
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
	},
	joinLink: {
		type: String,
	},
})
itemAttendanceSchema.plugin(mongooseLeanGetter)

const model = db.model('ItemAttendance', itemAttendanceSchema)

module.exports = model
