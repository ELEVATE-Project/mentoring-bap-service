'use strict'
const { internalRequests } = require('@helpers/requests')
const { itemQueries } = require('@database/storage/item/queries')
const { itemListTransformer } = require('@helpers/itemListTransformer')

const getRecommendations = async ({ userId, type }) => {
	try {
		const response = await internalRequests.recommendationPOST({
			route: process.env.RECOMMENDATION_GET_RECOMMENDATIONS,
			body: {
				userId,
			},
		})
		if (!response.status) return false
		const recommendedItems = response.data
		const items = await Promise.all(
			recommendedItems.map(async (item) => {
				const itemDoc = await itemQueries.findByItemId(item.itemId)
				return JSON.parse(itemDoc.details)
			})
		)
		return await itemListTransformer(items, type)
	} catch (err) {
		console.log(err)
		return false
	}
}

const getItemPageRecommendations = async ({ itemId, type }) => {
	try {
		const response = await internalRequests.recommendationPOST({
			route: process.env.RECOMMENDATION_GET_ITEM_PAGE_RECOMMENDATIONS,
			body: {
				itemId,
			},
		})
		if (!response.status) return false
		const recommendedItems = response.data
		const items = await Promise.all(
			recommendedItems.map(async (item) => {
				const itemDoc = await itemQueries.findByItemId(item.itemId)
				return JSON.parse(itemDoc.details)
			})
		)
		return await itemListTransformer(items, type)
	} catch (err) {
		console.log(err)
		return false
	}
}

const getProfilePageRecommendations = async ({ userId, type }) => {
	try {
		const response = await internalRequests.recommendationPOST({
			route: process.env.RECOMMENDATION_GET_PROFILE_PAGE_RECOMMENDATIONS,
			body: {
				userId,
			},
		})
		if (!response.status) return false
		const recommendedItems = response.data
		const items = await Promise.all(
			recommendedItems.map(async (item) => {
				const itemDoc = await itemQueries.findByItemId(item.itemId)
				return JSON.parse(itemDoc.details)
			})
		)
		return await itemListTransformer(items, type)
	} catch (err) {
		console.log(err)
		return false
	}
}

exports.recommendationService = {
	getRecommendations,
	getItemPageRecommendations,
	getProfilePageRecommendations,
}
