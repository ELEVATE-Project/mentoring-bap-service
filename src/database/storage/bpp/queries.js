'use strict'
const Bpp = require('./model')
const { isEmpty } = require('@utils/generic')

const create = async (data) => {
	try {
		return await new Bpp(data).save()
	} catch (err) {
		console.log(err)
	}
}

const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(where, defaults)
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		return await new Promise((resolve, reject) => {
			Bpp.findOrCreate(where, defaults, (err, bpp, isNew) => {
				if (err) reject(err)
				if (isNew) console.log('New BPP Entry Created')
				else console.log('Found Existing BPP')
				resolve({ bpp, isNew })
			})
		})
	} catch (err) {
		console.log('BPP.findOrCreate: ', err)
		throw err
	}
}

const findByIds = async (ids) => {
	try {
		return await Bpp.find({ _id: { $in: ids } }).lean()
	} catch (err) {
		console.log(err)
	}
}

const findById = async (id) => {
	try {
		return await Bpp.findById(id)
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
