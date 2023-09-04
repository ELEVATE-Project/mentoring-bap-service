'use strict'
const { isEmpty } = require('@utils/generic')
const db = require("../models-psql/index")
const Item = db.Item;

const create = async (data) => {
	try {
		return await Item.create(data)
	} catch (err) {
		console.log(err)
	}
}

const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		defaults = Object.assign(where, defaults)

		const [item, created] = await Item.findOrCreate({ where: where, defaults: defaults })
		if (created) console.log('New BPP Entry Created')
		else console.log('Found Existing BPP')

		return { item, isNew: created }
	} catch (err) {
		console.log('BPP.findOrCreate: ', err)
		throw err
	}
}

const findById = async (id) => {
	try {
		return await Item.findByPk(id)  // findByPk is the Sequelize method for finding by primary key
	} catch (err) {
		console.log(err)
		throw err
	}
}

const findByItemId = async (itemId) => {
	try {
		return await Item.findOne({ where: { itemId } })
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
