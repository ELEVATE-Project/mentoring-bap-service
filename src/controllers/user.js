'use strict'

const { userQueries } = require('@database/storage/user/queries')
const { profileQueries } = require('@database/storage/profile/queries')
const authentication = require('@utils/authentication')
const { internalRequests } = require('@helpers/requests')
const { responses } = require('@helpers/responses')

const login = async (req, res) => {
	const errorResponse = () => responses.failUnauthenticated(res, 'Authentication Failure')
	try {
		const email = req.body.email
		const password = req.body.password

		const user = await userQueries.findByEmail(email)
		if (!user) return errorResponse()
		const isValidPassword = await authentication.verifyPassword(password, user.hash, user.salt)
		if (!isValidPassword) return errorResponse()
		const jwtTokens = await authentication.generateJWTs(user)
		if (!jwtTokens) return errorResponse()

		responses.success(res, 'Login Successful', {
			email: user.email,
			accessToken: jwtTokens.accessToken,
			userId: user._id,
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		})
	} catch (err) {
		errorResponse()
		console.log(err)
	}
}

const signup = async (req, res) => {
	try {
		const email = req.body.email
		const password = req.body.password
		if (await userQueries.findByEmail(email)) return responses.failBad(res, 'Email Id Already Exists')

		const { salt, hash } = await authentication.generateHashAndSalt(password)
		const user = await userQueries.create(email, hash, salt)
		const jwtTokens = await authentication.generateJWTs(user)
		if (!jwtTokens) {
			await userQueries.deleteOne(user)
			return responses.failBad(res, 'SignUp Failed')
		}

		responses.successCreated(res, 'SignUp Successful', {
			email: user.email,
			accessToken: jwtTokens.accessToken,
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		})
	} catch (err) {
		console.log(err)
	}
}

const addProfile = async (req, res) => {
	const failedRes = () => responses.failBad(res, 'Profile Creation Failed')
	try {
		const userId = req.user.id
		const user = await userQueries.findById(userId)
		const email = user.email
		const name = req.body.name
		const phone = req.body.phone
		const newProfile = await profileQueries.updateOrCreateOne(userId, { name, phone })
		if (!newProfile) return failedRes()
		const response = await internalRequests.recommendationPOST({
			route: process.env.RECOMMENDATION_ADD_USER,
			body: {
				userId,
				email,
				phone,
				name,
			},
		})
		if (!response.status) return failedRes()
		responses.successCreated(res, 'Profile Created Successfully', newProfile)
	} catch (err) {
		console.log(err)
		failedRes()
	}
}

const editProfile = async (req, res) => {
	const failedRes = () => responses.failBad(res, 'Profile Update Failed')
	try {
		const userId = req.user.id
		const name = req.body.name
		const phone = req.body.phone
		const updatedProfile = await profileQueries.updateByUserId(userId, { name, phone })
		if (!updatedProfile) return failedRes()
		responses.success(res, 'Profile Updated Successfully', updatedProfile)
	} catch (err) {
		console.log(err)
		failedRes()
	}
}

const getUserEmails = async (req, res) => {
	try {
		const response = await internalRequests.recommendationPOST({
			route: process.env.RECOMMENDATION_GET_USER_EMAILS,
		})
		responses.success(res, 'All User Emails Fetched', response.data)
	} catch (err) {
		console.log(err)
		responses.failBad(res, 'Something Went Wrong')
	}
}

const userController = {
	login,
	signup,
	addProfile,
	editProfile,
	getUserEmails,
}

module.exports = userController
