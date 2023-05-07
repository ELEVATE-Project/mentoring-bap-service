'use strict'
const { itemAttendanceQueries } = require('@database/storage/itemAttendance/queries')
const { itemQueries } = require('@database/storage/item/queries')
const { internalRequests } = require('@helpers/requests')
const { responses } = require('@helpers/responses')
const { recommendationService } = require('@services/recommendation')

const getConfirmedList = async (req, res) => {
	try {
		const userId = req.user.id
		const itemAttendances = await itemAttendanceQueries.findByUserMongoId(userId)
		const attendances = await Promise.all(
			itemAttendances.map(async (itemAttendance) => {
				const item = await itemQueries.findById(itemAttendance.itemMongoId)
				return {
					orderId: itemAttendance.orderId,
					type: itemAttendance.type,
					details: JSON.parse(item.details),
					status: itemAttendance.status,
					joinLink: itemAttendance.joinLink,
				}
			})
		)
		responses.success(res, 'Fetched Confirmed List', attendances)
	} catch (err) {
		console.log(err)
	}
}

const markAttendanceCompleted = async (req, res) => {
	try {
		const userId = req.user.id
		const orderId = req.body.orderId
		const rating = req.body.rating
		const itemAttendance = await itemAttendanceQueries.findOne({ orderId, userMongoId: userId })
		if (!itemAttendance) return responses.failBad(res, 'Attendance Not Found')
		const updatedAttendance = await itemAttendanceQueries.setAsCompleted(orderId, rating)
		const item = await itemQueries.findById(itemAttendance.itemMongoId)
		const response = await internalRequests.recommendationPOST({
			route: process.env.RECOMMENDATION_ADD_RATING,
			body: {
				userId,
				itemId: item.itemId,
				rating,
			},
		})
		if (!response.status) throw 'Neo4j Item Injection Failed'
		responses.success(res, 'Item Marked As Completed', updatedAttendance)
	} catch (err) {
		console.log(err)
		responses.failBad(res, 'Something Went Wrong')
	}
}

const getRecommendations = async (req, res) => {
	try {
		const userId = req.user.id
		const type = req.body.type
		const recommendations = await recommendationService.getRecommendations({ userId, type })
		if (!recommendations) return responses.failBad(res, 'Something Went Wrong')
		responses.success(res, `Recommendations For ${userId}`, recommendations)
	} catch (err) {
		console.log(err)
		responses.failBad(res, 'Something Went Wrong')
	}
}

const getProfilePageRecommendations = async (req, res) => {
	try {
		const userId = req.user.id
		const type = req.body.type
		const recommendations = await recommendationService.getProfilePageRecommendations({ userId, type })
		if (!recommendations) return responses.failBad(res, 'Something Went Wrong')
		responses.success(res, `Recommendations For ${userId}`, recommendations)
	} catch (err) {
		console.log(err)
		responses.failBad(res, 'Something Went Wrong')
	}
}

const getItemPageRecommendations = async (req, res) => {
	try {
		const itemId = req.body.itemId
		const type = req.body.type
		const recommendations = await recommendationService.getItemPageRecommendations({ itemId, type })
		if (!recommendations) return responses.failBad(res, 'Something Went Wrong')
		responses.success(res, `Recommendations For ${itemId}`, recommendations)
	} catch (err) {
		console.log(err)
		responses.failBad(res, 'Something Went Wrong')
	}
}

const consumerController = {
	getConfirmedList,
	markAttendanceCompleted,
	getRecommendations,
	getItemPageRecommendations,
	getProfilePageRecommendations,
}

module.exports = consumerController
