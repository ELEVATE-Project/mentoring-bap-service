'use strict'
const ItemAttendance = require('./model')
const { isEmpty } = require('@utils/generic')

const create = async (data) => {
	try {
		return await new ItemAttendance(data).save()
	} catch (err) {
		console.log(err)
	}
}

const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(where, defaults)
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		return await new Promise((resolve, reject) => {
			ItemAttendance.findOrCreate(where, defaults, (err, itemAttendance, isNew) => {
				if (err) reject(err)
				if (isNew) console.log('New BPP Entry Created')
				else console.log('Found Existing BPP')
				resolve({ itemAttendance, isNew })
			})
		})
	} catch (err) {
		console.log('BPP.findOrCreate: ', err)
		throw err
	}
}

const findById = async (id) => {
	try {
		return await ItemAttendance.findById(id)
	} catch (err) {
		console.log(err)
		throw err
	}
}

const findByUserMongoId = async (userMongoId) => {
	try {
		return await ItemAttendance.find({ userMongoId })
	} catch (err) {
		console.log(err)
		throw err
	}
}

const setAsCompleted = async (orderId, rating) => {
	try {
		return await ItemAttendance.findOneAndUpdate({ orderId }, { status: 'completed', rating }, { new: true })
	} catch (err) {
		console.log(err)
		throw err
	}
}

const addRating = async (orderId, rating) => {
	try {
		return await ItemAttendance.findOneAndUpdate({ orderId }, { rating }, { new: true })
	} catch (err) {
		console.log(err)
		throw err
	}
}

const findOne = async (data) => {
	try {
		return await ItemAttendance.findOne(data)
	} catch (err) {
		console.log(err)
		throw err
	}
}

exports.itemAttendanceQueries = {
	create,
	findOrCreate,
	findByUserMongoId,
	findById,
	setAsCompleted,
	addRating,
	findOne,
}
