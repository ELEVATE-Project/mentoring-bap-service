'use strict'
const db = require("../models-psql/index")
const User = db.user;

const create = async (email, hash, salt) => {
	try {
		const newUser = await User.create({
			email,
			hash,
			salt,
		})
		return newUser
	} catch (err) {
		console.log(err)
		throw err
	}
}

const findById = async (userId) => {
	try {
		return await User.findByPk(userId)
	} catch (err) {
		console.log(err)
		throw err
	}
}

const findByEmail = async (email) => {
	try {
		return await User.findOne({ where: { email: email } })
	} catch (err) {
		console.log(err)
		throw err
	}
}

const deleteOne = async (userId) => {
	try {
		const user = await User.findByPk(userId)
		if(user){
			await user.destroy()
		}
	} catch (err) {
		console.log(err)
		throw err
	}
}

module.exports.userQueries = {
	create,
	findByEmail,
	deleteOne,
	findById,
}
