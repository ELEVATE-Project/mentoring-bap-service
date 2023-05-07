'use strict'
const User = require('./model')

const create = async (email, hash, salt) => {
	try {
		const newUser = new User({
			email,
			hash,
			salt,
		})
		return await newUser.save()
	} catch (err) {
		console.log(err)
		throw err
	}
}

const findById = async (userId) => {
	try {
		return await User.findById(userId)
	} catch (err) {
		console.log(err)
		throw err
	}
}

const findByEmail = async (email) => {
	try {
		return await User.findOne({ email: email })
	} catch (err) {
		console.log(err)
		throw err
	}
}

const deleteOne = async (user) => {
	try {
		await User.deleteOne({ _id: user._id })
	} catch (err) {
		console.log(err)
		throw err
	}
}

exports.userQueries = {
	create,
	findByEmail,
	deleteOne,
	findById,
}
