'use strict'
const { isEmpty } = require('@utils/generic')
const { Op } = require('sequelize')
const db = require('../models-psql/index')
const Bpp = db.Bpp

const create = async (data) => {
	try {
		return await Bpp.create(data)
	} catch (err) {
		console.log(err)
	}
}

const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		defaults = Object.assign(where, defaults)

		console.log('where print', where)

		const [bpp, created] = await Bpp.findOrCreate({ where: where, defaults: defaults })
		if (created) console.log('New BPP Entry Created')
		else console.log('Found Existing BPP')

		return { bpp, isNew: created }
	} catch (err) {
		console.log('BPP.findOrCreate: ', err)
		throw err
	}
}

const findByIds = async (bppIds) => {
	try {
		return await Bpp.findAll({
			where: {
				id: {
					[Op.in]: bppIds,
				},
			},
		})
	} catch (err) {
		console.log(err)
	}
}

const findById = async (bppId) => {
	try {
		return await Bpp.findByPk(bppId)
	} catch (err) {
		console.log(err)
		throw err
	}
}

exports.bppQueries = {
	create,
	findOrCreate,
	findByIds,
	findById,
}
