'use strict'
const mongoose = require('mongoose')
const db = require('@configs/mongodb')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	hash: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
})

const model = db.model('User', userSchema)
module.exports = model
