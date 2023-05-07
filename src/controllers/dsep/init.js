'use strict'
const crypto = require('crypto')
const { contextBuilder } = require('@utils/contextBuilder')
const { requestBodyDTO } = require('@dtos/requestBody')
const { externalRequests } = require('@helpers/requests')
const { profileQueries } = require('@database/storage/profile/queries')
const { userQueries } = require('@database/storage/user/queries')
const { initMessageDTO } = require('@dtos/initMessage')
const { getMessage, sendMessage, cacheGet } = require('@utils/redis')
const { searchItemListGenerator } = require('@helpers/searchItemListGenerator')
const { bppQueries } = require('@database/storage/bpp/queries')
const { catalogService } = require('@services/catalog')
const { wait } = require('@utils/wait')

exports.init = async (req, res) => {
	const failedRes = (message) => res.status(400).json({ status: false, message })
	try {
		const transactionId = crypto.randomUUID()
		const messageId = crypto.randomUUID()
		const itemId = req.body.itemId
		const fulfillmentId = req.body.fulfillmentId
		const userId = req.user.id
		const context = await contextBuilder(transactionId, messageId, process.env.INIT_ACTION)
		if (!itemId || !fulfillmentId) return failedRes('Either itemId Or fulfillmentId id is missing')

		const userProfile = await profileQueries.findByUserId(userId)
		const user = await userQueries.findById(userId)

		const message = initMessageDTO({
			itemId,
			fulfillmentId,
			name: userProfile.name,
			phone: userProfile.phone,
			email: user.email,
		})

		const initRequestBody = requestBodyDTO(context, message)
		const bppMongoId = await cacheGet(`SESSION:BPP_ID:${itemId}`)
		const bpp = await bppQueries.findById(bppMongoId)
		if (!bpp) failedRes('Bpp Not Found')
		await externalRequests.dsepPOST({
			baseURL: bpp.bppUri,
			body: initRequestBody,
			route: process.env.INIT_ROUTE,
		})
		const redisMessage = await Promise.race([
			getMessage(`INIT:${transactionId}`),
			wait(process.env.CALLBACK_MAXIMUM_WAIT_TIME).then(() => {
				return false
			}),
		])
		if (redisMessage !== `INIT:${transactionId}`) return failedRes('Something Went Wrong')
		const items = await searchItemListGenerator(transactionId, 'session')
		res.status(200).json({
			status: true,
			message: 'Init Success',
			data: items[0],
		})
	} catch (err) {
		console.log(err)
	}
}

exports.onInit = async (req, res) => {
	try {
		const context = req.body.context
		const bppUriFromContext = context.bpp_uri
		const bppIdFromContext = context.bpp_id
		const { bpp } = await bppQueries.findOrCreate({
			where: { bppId: bppIdFromContext },
			defaults: { bppUri: bppUriFromContext },
		})
		const transactionId = context.transaction_id
		const bppMongoId = bpp._id
		const providers = [req.body.message.order.provider]
		const isCatalogHandled = await catalogService.catalogHandler(providers, transactionId, bppMongoId)
		if (isCatalogHandled) await sendMessage(`INIT:${transactionId}`, `INIT:${transactionId}`)
		else await sendMessage(`INIT:${transactionId}`, 'false')
		res.status(200).json({
			status: true,
			message: 'On_Select Success',
			data: {},
		})
	} catch (err) {
		console.log(err)
	}
}
