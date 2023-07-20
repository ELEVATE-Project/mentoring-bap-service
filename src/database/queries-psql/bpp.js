'use strict'
const Bpp = require('../models-psql/bpp')
const { Op } = require('sequelize')
const { isEmpty } = require('@utils/generic')

const create = async (data) => {
	try {
		return await Bpp.create(data)
	} catch (err) {
		console.error(err)
		throw err
	}
}

const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		if (isEmpty(where)) throw new Error('Where Clause Is Empty')
		const [bpp, created] = await Bpp.findOrCreate({ where, defaults })
		if (created) console.log('New BPP Entry Created')
		else console.log('Found Existing BPP')
		return { bpp, created }
	} catch (err) {
		console.error('BPP.findOrCreate: ', err)
		throw err
	}
}

const findByIds = async (ids) => {
	try {
		return await Bpp.findAll({ where: { id: { [Op.in]: ids } }})
	} catch (err) {
		console.error(err)
		throw err
	}
}

const findById = async (id) => {
	try {
		return await Bpp.findByPk(id)
	} catch (err) {
		console.error(err)
		throw err
	}
}

exports.bppQueries = {
	create,
	findOrCreate,
	findByIds,
	findById,
}
