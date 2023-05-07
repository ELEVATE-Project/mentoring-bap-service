'use strict'
const Profile = require('./model')

const create = async (userId, name, phone) => {
	try {
		const newProfile = new Profile({
			userId,
			name,
			phone,
		})
		return await newProfile.save()
	} catch (err) {
		console.log(err)
		throw err
	}
}

const updateOrCreateOne = async (userId, { name, phone }) => {
	try {
		return await Profile.findOneAndUpdate({ userId }, { name, phone }, { upsert: true, new: true })
	} catch (err) {
		console.log(err)
		throw err
	}
}

const updateByUserId = async (userId, { name, phone }) => {
	try {
		return await Profile.findOneAndUpdate({ userId }, { name, phone }, { new: true })
	} catch (err) {
		console.log(err)
		throw err
	}
}

const findByUserId = async (userId) => {
	try {
		return await Profile.findOne({ userId })
	} catch (err) {
		console.log(err)
		throw err
	}
}

exports.profileQueries = {
	create,
	updateOrCreateOne,
	updateByUserId,
	findByUserId,
}
