'use strict'
const mongoose = require('mongoose')
const db = require('@configs/mongodb')
const { ObjectId } = require('mongodb')

const profileSchema = new mongoose.Schema({
	userId: {
		type: ObjectId,
		unique: true,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
})

const model = db.model('Profile', profileSchema)
module.exports = model
