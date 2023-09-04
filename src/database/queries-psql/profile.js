'use strict'
const db = require("../models-psql/index")
const Profile = db.profile;

const create = async (userId, name, phone) => {
	try {
		return await Profile.create({
			userId,
			name,
			phone,
		})
	} catch (err) {
		console.log(err)
		throw err
	}
}

const updateOrCreateOne = async (userId, { name, phone }) => {
	try {
		let profile = await Profile.findOne({ where: { userId }})
		if(profile) {
			profile.name = name
			profile.phone = phone
			await profile.save()
		} else {
			profile = await Profile.create({ userId, name, phone })
		}
		return profile
	} catch (err) {
		console.log(err)
		throw err
	}
}

const updateByUserId = async (userId, { name, phone }) => {
	try {
		let profile = await Profile.findOne({ where: { userId } })
		if(profile) {
			profile.name = name
			profile.phone = phone
			await profile.save()
		}
		return profile
	} catch (err) {
		console.log(err)
		throw err
	}
}

const findByUserId = async (userId) => {
	try {
		return await Profile.findOne({ where: { userId } })
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
