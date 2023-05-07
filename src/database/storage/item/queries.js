'use strict'
const Item = require('./model')
const { isEmpty } = require('@utils/generic')

const create = async (data) => {
	try {
		return await new Item(data).save()
	} catch (err) {
		console.log(err)
	}
}

const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(where, defaults)
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		return await new Promise((resolve, reject) => {
			Item.findOrCreate(where, defaults, (err, item, isNew) => {
				if (err) reject(err)
				if (isNew) console.log('New BPP Entry Created')
				else console.log('Found Existing BPP')
				resolve({ item, isNew })
			})
		})
	} catch (err) {
		console.log('BPP.findOrCreate: ', err)
		throw err
	}
}

const findById = async (id) => {
	try {
		return await Item.findById(id)
	} catch (err) {
		console.log(err)
		throw err
	}
}

const findByItemId = async (itemId) => {
	try {
		return await Item.findOne({ itemId })
	} catch (err) {
		console.log(err)
		throw err
	}
}

exports.itemQueries = {
	create,
	findOrCreate,
	findByItemId,
	findById,
}
