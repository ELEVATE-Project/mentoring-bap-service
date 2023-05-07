'use strict'
const mongoose = require('mongoose')
const mongooseLeanGetter = require('mongoose-lean-getters')
const findOrCreate = require('mongoose-findorcreate')
const db = require('@configs/mongodb')
const { ObjectId } = require('mongodb')

const itemSchema = new mongoose.Schema({
	itemId: {
		type: String,
		required: true,
	},
	details: {
		type: String,
	},
	bppMongoId: {
		type: ObjectId,
	},
})
itemSchema.plugin(mongooseLeanGetter)
itemSchema.plugin(findOrCreate)

const model = db.model('Item', itemSchema)

module.exports = model
