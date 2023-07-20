'use strict'
const Item = require('../models-psql/item')
const { isEmpty } = require('@utils/generic')

const create = async (data) => {
	try {
		return await Item.create(data)
	} catch (err) {
		console.error(err)
		throw err
	}
}

const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		if (isEmpty(where)) throw new Error('Where Clause Is Empty')
		const [item, created] = await Item.findOrCreate({ where, defaults })
		if (created) console.log('New Item Entry Created')
		else console.log('Found Existing Item')
		return { item, created }
	} catch (err) {
		console.error('Item.findOrCreate: ', err)
		throw err
	}
}

const findById = async (id) => {
	try {
		return await Item.findByPk(id)
	} catch (err) {
		console.error(err)
		throw err
	}
}

const findByItemId = async (itemId) => {
	try {
		return await Item.findOne({ where: { itemId } })
	} catch (err) {
		console.error(err)
		throw err
	}
}

exports.itemQueries = {
	create,
	findOrCreate,
	findByItemId,
	findById,
}
