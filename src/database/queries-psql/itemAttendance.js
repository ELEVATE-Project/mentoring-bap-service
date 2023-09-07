'use strict'
const { isEmpty } = require('@utils/generic')
const db = require("../models-psql/index")
const ItemAttendance = db.itemAttendance;

const create = async (data) => {
	try {
		return await ItemAttendance.create(data)
	} catch (err) {
		console.error(err)
		throw err
	}
}

const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		if (isEmpty(where)) throw new Error('Where Clause Is Empty')
		const [itemAttendance, created] = await ItemAttendance.findOrCreate({ where, defaults })
		if (created) console.log('New ItemAttendance Entry Created')
		else console.log('Found Existing ItemAttendance')
		return { itemAttendance, created }
	} catch (err) {
		console.error('ItemAttendance.findOrCreate: ', err)
		throw err
	}
}

const findById = async (id) => {
	try {
		return await ItemAttendance.findByPk(id)
	} catch (err) {
		console.error(err)
		throw err
	}
}

const findByUserMongoId = async (userMongoId) => {
	try {
		return await ItemAttendance.findAll({ where: { userMongoId } })
	} catch (err) {
		console.error(err)
		throw err
	}
}

const setAsCompleted = async (orderId, rating) => {
	try {
		const [updated] = await ItemAttendance.update({ status: 'completed', rating }, { where: { orderId }, returning: true })
		if (!updated) throw new Error('No record found to update')
		return updated
	} catch (err) {
		console.error(err)
		throw err
	}
}

const addRating = async (orderId, rating) => {
	try {
		const [updated] = await ItemAttendance.update({ rating }, { where: { orderId }, returning: true })
		if (!updated) throw new Error('No record found to update')
		return updated
	} catch (err) {
		console.error(err)
		throw err
	}
}

const findOne = async (data) => {
	try {
		return await ItemAttendance.findOne({ where: data })
	} catch (err) {
		console.error(err)
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
