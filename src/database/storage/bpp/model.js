'use strict'
const mongoose = require('mongoose')
const mongooseLeanGetter = require('mongoose-lean-getters')
const findOrCreate = require('mongoose-findorcreate')
const db = require('@configs/mongodb')

const bppSchema = new mongoose.Schema({
	bppId: {
		type: String,
		required: true,
	},
	bppUri: {
		type: String,
		required: true,
	},
})
bppSchema.plugin(mongooseLeanGetter)
bppSchema.plugin(findOrCreate)

const model = db.model('Bpp', bppSchema)

module.exports = model
