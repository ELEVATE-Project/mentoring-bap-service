'use strict'
const crypto = require('crypto')
const { contextBuilder } = require('@utils/contextBuilder')
const { selectMessageDTO } = require('@dtos/selectMessage')
const { requestBodyDTO } = require('@dtos/requestBody')
const { externalRequests } = require('@helpers/requests')
const { bppQueries } = require('@database/storage/bpp/queries')
const { catalogService } = require('@services/catalog')
const { getMessage, sendMessage, cacheGet } = require('@utils/redis')
const { searchItemListGenerator } = require('@helpers/searchItemListGenerator')
const { wait } = require('@utils/wait')

exports.select = async (req, res) => {
	const failedRes = (message) => res.status(400).json({ status: false, message })
	try {
		const transactionId = crypto.randomUUID()
		const messageId = crypto.randomUUID()
		const itemId = req.body.itemId
		if (!itemId) return failedRes('ItemId missing')
		const context = await contextBuilder(transactionId, messageId, process.env.SELECT_ACTION)
		let message = selectMessageDTO(itemId)
		const selectRequestBody = requestBodyDTO(context, message)

		const bppMongoId = await cacheGet(`SESSION:BPP_ID:${itemId}`)
		const bpp = await bppQueries.findById(bppMongoId)
		if (!bpp) failedRes('Bpp Not Found')
		await externalRequests.dsepPOST({
			baseURL: bpp.bppUri,
			body: selectRequestBody,
			route: process.env.SELECT_ROUTE,
		})
		const redisMessage = await Promise.race([
			getMessage(`SELECT:${transactionId}`),
			wait(process.env.CALLBACK_MAXIMUM_WAIT_TIME).then(() => {
				return false
			}),
		])
		if (redisMessage !== `SELECT:${transactionId}`) return failedRes('Something Went Wrong')
		const items = await searchItemListGenerator(transactionId, 'session')
		res.status(200).json({
			status: true,
			message: 'Select Success',
			data: items[0],
		})
	} catch (err) {
		console.log(err)
	}
}

exports.onSelect = async (req, res) => {
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
		if (isCatalogHandled) await sendMessage(`SELECT:${transactionId}`, `SELECT:${transactionId}`)
		else await sendMessage(`SELECT:${transactionId}`, 'false')
		res.status(200).json({
			status: true,
			message: 'On_Select Success',
			data: {},
		})
	} catch (err) {
		console.log(err)
	}
}
